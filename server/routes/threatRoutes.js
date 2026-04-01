const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');
const { protect } = require('../middleware/auth');

// Simulated Breach Database (Mock Data)
const SIMULATED_BREACHES = [
    { email: 'test@example.com', source: 'LinkedIn 2012', data: 'Password, Email' },
    { email: 'admin@google.com', source: 'Dropbox 2016', data: 'Password Hash' },
    { email: 'user@yahoo.com', source: 'Yahoo 2013', data: 'Personal Info' }
];

// @desc    Get simulated live threat data
// @route   GET /api/threats/live
// @access  Public
router.get('/live', (req, res) => {
    // Generate random attacks
    const attackTypes = ['DDoS', 'Phishing', 'Malware', 'Brute-force', 'SQL Injection', 'Ransomware'];
    const countries = [
        { name: 'USA', lat: 37.0902, lng: -95.7129 },
        { name: 'China', lat: 35.8617, lng: 104.1954 },
        { name: 'Russia', lat: 61.5240, lng: 105.3188 },
        { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
        { name: 'India', lat: 20.5937, lng: 78.9629 },
        { name: 'Germany', lat: 51.1657, lng: 10.4515 },
        { name: 'UK', lat: 55.3781, lng: -3.4360 },
        { name: 'France', lat: 46.2276, lng: 2.2137 },
        { name: 'Japan', lat: 36.2048, lng: 138.2529 },
        { name: 'Australia', lat: -25.2744, lng: 133.7751 }
    ];

    const attacks = [];
    for (let i = 0; i < 5; i++) {
        const source = countries[Math.floor(Math.random() * countries.length)];
        let target = countries[Math.floor(Math.random() * countries.length)];
        while (source.name === target.name) {
            target = countries[Math.floor(Math.random() * countries.length)];
        }

        attacks.push({
            id: Math.random().toString(36).substr(2, 9),
            source: source,
            target: target,
            type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
            timestamp: new Date().toISOString()
        });
    }

    res.json(attacks);
});

// @desc    Check for breaches (Simulated)
// @route   POST /api/threats/breach-check
// @access  Public
router.post('/breach-check', (req, res) => {
    const { email } = req.body;

    // Simple simulation: 
    // If email contains "hacked", return simulated breach.
    // Or if it matches our static list.
    // Or random 10% chance.

    const found = SIMULATED_BREACHES.filter(b => b.email === email);

    // For demo purposes, if email is 'demo@breached.com' force a breach
    if (email === 'demo@breached.com' || found.length > 0) {
        return res.json({
            exposed: true,
            breaches: found.length > 0 ? found : [{ source: 'Simulated Data Leak', data: 'Email, Password' }],
            riskLevel: 'High'
        });
    }

    res.json({
        exposed: false,
        breaches: [],
        riskLevel: 'Safe'
    });
});

// @desc    Run Attack Simulation
// @route   POST /api/threats/simulate
// @access  Private
const AttackSimulation = require('../models/AttackSimulation');
const NetworkScan = require('../models/NetworkScan');

// @desc    Run Advanced Attack Simulation
// @route   POST /api/threats/simulate
// @access  Private
router.post('/simulate', protect, async (req, res) => {
    const { attackType, scanId } = req.body;
    let result = {};
    let scanData = null;

    try {
        if (scanId) {
            scanData = await NetworkScan.findById(scanId);
        }

        let impactMultiplier = 1;
        let mitigations = [];
        let effects = [];

        // Logic based on scan data
        if (scanData) {
            if (scanData.riskScore > 50) impactMultiplier = 1.5;
            if (scanData.openPorts.some(p => p.port === 80)) impactMultiplier += 0.2;
        }

        switch (attackType) {
            case 'DDoS':
                effects = ["High request rate observed", "Service latency increased by 300ms", "Firewall throttling active"];
                mitigations = ["Rate Limiting", "IP Blacklisting", "Traffic Shaping"];
                result = {
                    attack: "DDoS",
                    message: "High-volumetric traffic surge simulation.",
                    impactLevel: impactMultiplier > 1.2 ? 'HIGH' : 'MEDIUM'
                };
                break;
            case 'Phishing':
                effects = ["Malicious email detected", "User clicked simulated link", "Credential harvest attempt"];
                mitigations = ["Email Filtering", "User Education Alert", "Domain Blocking"];
                result = {
                    attack: "Phishing",
                    message: "Social engineering campaign simulation.",
                    impactLevel: 'LOW'
                };
                break;
            case 'Port Abuse':
                effects = [`Unauth access attempt on Port ${scanData?.openPorts[0]?.port || 80}`, "Brute force logs generated"];
                mitigations = ["Port Knocking", "Fail2Ban Triggered"];
                result = {
                    attack: "Port Abuse",
                    message: "Targeted service exploitation simulation.",
                    impactLevel: 'MEDIUM'
                };
                break;
            case 'Brute Force':
                effects = ["Multiple failed login attempts", "Account lockout warning"];
                mitigations = ["Account Lockout", "Admin Alert"];
                result = {
                    attack: "Brute Force",
                    message: "Credential stuffing simulation.",
                    impactLevel: 'HIGH'
                };
                break;
            default: // Fallback for basic buttons
                effects = ["Standard simulation routine"];
                mitigations = ["Standard Defense"];
                result = { attack: attackType, message: "Standard simulation", impactLevel: "LOW" };
        }

        // Save detailed simulation log
        await AttackSimulation.create({
            user: req.user._id,
            scanReference: scanId || null,
            target: scanData ? scanData.target : 'Generic Target',
            attackType: result.attack,
            severity: result.impactLevel,
            impactReport: {
                servicesAffected: effects,
                latencyIncrease: '200ms',
                dataExfiltrated: false
            },
            mitigationsTriggered: mitigations
        });

        // Add to main Activity Log
        await ActivityLog.create({
            user: req.user._id,
            action: 'ATTACK_SIMULATION_ADVANCED',
            details: `Ran ${result.attack} simulation on ${scanData ? scanData.target : 'Generic'}`,
            ipAddress: req.ip
        });

        res.json({
            ...result,
            effects,
            mitigations
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Simulation failed" });
    }
});

module.exports = router;
