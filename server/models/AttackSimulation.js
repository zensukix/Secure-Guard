const mongoose = require('mongoose');

const AttackSimulationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scanReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NetworkScan'
    },
    target: {
        type: String,
        required: true
    },
    attackType: {
        type: String,
        enum: ['DDoS', 'Phishing', 'Port Abuse', 'Brute Force'],
        required: true
    },
    status: {
        type: String,
        enum: ['RUNNING', 'COMPLETED', 'BLOCKED', 'FAILED'],
        default: 'RUNNING'
    },
    severity: {
        type: String, // 'LOW', 'MEDIUM', 'HIGH'
    },
    packetsSent: {
        type: Number,
        default: 0
    },
    impactReport: {
        servicesAffected: [String],
        latencyIncrease: String,
        dataExfiltrated: Boolean
    },
    mitigationsTriggered: [String],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AttackSimulation', AttackSimulationSchema);
