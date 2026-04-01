const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const { protect } = require('../middleware/auth');

// @desc    Get Academy Progress
// @route   GET /api/academy/progress
// @access  Private
router.get('/progress', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('academyProgress xp level');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Complete Module
// @route   POST /api/academy/complete
// @access  Private
router.post('/complete', protect, async (req, res) => {
    const { moduleId, xpEarned, score } = req.body;

    try {
        const user = await User.findById(req.user._id);

        // Update Module Progress
        const moduleIndex = user.academyProgress.findIndex(p => p.moduleId === moduleId);
        if (moduleIndex > -1) {
            user.academyProgress[moduleIndex].status = 'completed';
            user.academyProgress[moduleIndex].score = score;
            user.academyProgress[moduleIndex].completedAt = new Date();
        } else {
            user.academyProgress.push({
                moduleId,
                status: 'completed',
                score,
                completedAt: new Date()
            });
        }

        // Add XP
        user.xp = (user.xp || 0) + xpEarned;

        // Calculate Level
        if (user.xp >= 1000) user.level = 'Cyber Guardian';
        else if (user.xp >= 500) user.level = 'Security Analyst';
        else if (user.xp >= 200) user.level = 'Defender';
        else if (user.xp >= 50) user.level = 'Rookie';
        else user.level = 'Cadet';

        await user.save();

        await ActivityLog.create({
            user: req.user._id,
            action: 'ACADEMY_COMPLETION',
            details: `Completed module ${moduleId} (+${xpEarned} XP)`,
            ipAddress: req.ip
        });

        res.json({ xp: user.xp, level: user.level, academyProgress: user.academyProgress });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
