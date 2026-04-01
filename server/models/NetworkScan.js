const mongoose = require('mongoose');

const NetworkScanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    target: {
        type: String,
        required: true
    },
    targetType: {
        type: String, // 'IP' or 'Domain'
        default: 'IP'
    },
    openPorts: [{
        port: Number,
        service: String,
        status: String // 'OPEN', 'FILTERED'
    }],
    detectedServices: [String],
    riskScore: {
        type: Number, // 0-100
        default: 0
    },
    vulnerabilities: [{
        id: String,
        severity: String, // 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
        description: String
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('NetworkScan', NetworkScanSchema);
