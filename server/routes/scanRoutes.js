const express = require('express');
const NetworkScan = require('../models/NetworkScan');
const ActivityLog = require('../models/ActivityLog');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Helper to generate random open ports
const getRandomPorts = () => {
    const commonPorts = [
        { port: 21, service: 'FTP', risk: 60 },
        { port: 22, service: 'SSH', risk: 40 },
        { port: 25, service: 'SMTP', risk: 30 },
        { port: 80, service: 'HTTP', risk: 10 },
        { port: 443, service: 'HTTPS', risk: 0 },
        { port: 3306, service: 'MySQL', risk: 70 },
        { port: 3389, service: 'RDP', risk: 80 },
        { port: 8080, service: 'HTTP-ALT', risk: 20 }
    ];

    // Pick 1-4 random ports
    const shuffled = commonPorts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 4) + 1);
};

// @desc    Run Simulated Network Scan
// @route   POST /api/scans/run
// @access  Private
router.post('/run', protect, async (req, res) => {
    const { target } = req.body;

    if (!target) {
        return res.status(400).json({ message: 'Target is required' });
    }

    // Simulate Processing Delay managed by frontend generally, but here we just process
    try {
        const detectedPorts = getRandomPorts();
        const score = detectedPorts.reduce((acc, curr) => acc + curr.risk, 0) / detectedPorts.length;

        let riskLevelScore = Math.floor(score + (Math.random() * 20));
        if (riskLevelScore > 100) riskLevelScore = 99;

        const services = detectedPorts.map(p => p.service);

        const vulnerabilities = [];
        if (services.includes('FTP')) vulnerabilities.push({ id: 'CVE-2023-XXXX', severity: 'HIGH', description: 'Anonymous FTP Login Allowed' });
        if (services.includes('MySQL')) vulnerabilities.push({ id: 'CVE-2022-YYYY', severity: 'CRITICAL', description: 'Weak Root Password detected' });
        if (services.includes('HTTP')) vulnerabilities.push({ id: 'WARN-001', severity: 'MEDIUM', description: 'Unencrypted Traffic' });

        const scan = await NetworkScan.create({
            user: req.user._id,
            target,
            targetType: target.match(/^[0-9.]+$/) ? 'IP' : 'Domain',
            openPorts: detectedPorts.map(p => ({ port: p.port, service: p.service, status: 'OPEN' })),
            detectedServices: services,
            riskScore: riskLevelScore,
            vulnerabilities
        });

        await ActivityLog.create({
            user: req.user._id,
            action: 'NETWORK_SCAN',
            details: `Scanned target: ${target} [Risk: ${riskLevelScore}]`
        });

        res.status(201).json(scan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get User Scan History
// @route   GET /api/scans/history
// @access  Private
router.get('/history', protect, async (req, res) => {
    try {
        const scans = await NetworkScan.find({ user: req.user._id }).sort({ timestamp: -1 });
        res.json(scans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
