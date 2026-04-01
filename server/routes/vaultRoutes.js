const express = require('express');
const Password = require('../models/Password');
const ActivityLog = require('../models/ActivityLog');
const { protect } = require('../middleware/auth');
const { encrypt, decrypt } = require('../utils/encryption');
const router = express.Router();

// @desc    Get all passwords
// @route   GET /api/passwords
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const passwords = await Password.find({ user: req.user._id });
        // Return without decrypting the password field for list view
        // Only return metadata
        const safePasswords = passwords.map(p => ({
            _id: p._id,
            title: p.title,
            username: p.username,
            url: p.url,
            category: p.category,
            createdAt: p.createdAt
            // No password sent here
        }));
        res.json(safePasswords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a password
// @route   POST /api/passwords
// @access  Private
router.post('/', protect, async (req, res) => {
    const { title, username, password, url, category } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const encrypted = encrypt(password);

        const newPassword = await Password.create({
            user: req.user._id,
            title,
            username,
            encryptedPassword: encrypted,
            url,
            category
        });

        await ActivityLog.create({
            user: req.user._id,
            action: 'ADD_PASSWORD',
            details: `Added password for ${title}`
        });

        res.status(201).json(newPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Reveal a specific password
// @route   GET /api/passwords/:id/reveal
// @access  Private
router.post('/:id/reveal', protect, async (req, res) => {
    // In a real app, we might ask for the master password again here
    try {
        const passwordEntry = await Password.findById(req.params.id);

        if (!passwordEntry) {
            return res.status(404).json({ message: 'Password not found' });
        }

        if (passwordEntry.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await ActivityLog.create({
            user: req.user._id,
            action: 'REVEAL_PASSWORD',
            details: `Revealed password for ${passwordEntry.title}`
        });

        const decrypted = decrypt(passwordEntry.encryptedPassword);
        res.json({ password: decrypted });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete password
// @route   DELETE /api/passwords/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const passwordEntry = await Password.findById(req.params.id);

        if (!passwordEntry) {
            return res.status(404).json({ message: 'Password not found' });
        }

        if (passwordEntry.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await passwordEntry.deleteOne();

        await ActivityLog.create({
            user: req.user._id,
            action: 'DELETE_PASSWORD',
            details: `Deleted password for ${passwordEntry.title}`
        });

        res.json({ message: 'Password removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Analyze Vault Health
// @route   GET /api/passwords/analyze
// @access  Private
router.get('/analyze', protect, async (req, res) => {
    try {
        const passwords = await Password.find({ user: req.user._id });
        const decryptedPasswords = passwords.map(p => {
            try {
                return {
                    id: p._id,
                    plain: decrypt(p.encryptedPassword),
                    age: p.lastRotated || p.createdAt,
                    category: p.category
                };
            } catch (err) {
                // If decryption fails (e.g. old key/format), skip analysis for this item
                return null;
            }
        }).filter(p => p !== null); // Remove failed items

        const analysis = {
            total: passwords.length,
            reused: [],
            aging: [],
            weak: [],
            overallScore: 100
        };

        const occurences = {};

        decryptedPasswords.forEach(p => {
            // 1. Reuse Detection
            if (occurences[p.plain]) {
                occurences[p.plain].push(p.id);
            } else {
                occurences[p.plain] = [p.id];
            }

            // 2. Age Detection (> 90 days)
            const daysOld = Math.floor((Date.now() - new Date(p.age)) / (1000 * 60 * 60 * 24));
            if (daysOld > 90) {
                analysis.aging.push({ id: p.id, days: daysOld });
            }

            // 3. Simple Pattern Detection (Simulation of zxcvbn)
            let score = 0;
            if (p.plain.length > 8) score += 1;
            if (p.plain.length > 12) score += 1;
            if (/[A-Z]/.test(p.plain)) score += 1;
            if (/[0-9]/.test(p.plain)) score += 1;
            if (/[^A-Za-z0-9]/.test(p.plain)) score += 1;

            if (score < 3) analysis.weak.push(p.id);
        });

        // Collect Reused IDs
        Object.values(occurences).forEach(ids => {
            if (ids.length > 1) {
                analysis.reused.push(...ids);
            }
        });

        // Calc Score
        let penalties = (analysis.reused.length * 5) + (analysis.aging.length * 2) + (analysis.weak.length * 3);
        analysis.overallScore = Math.max(0, 100 - penalties);

        res.json(analysis);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
