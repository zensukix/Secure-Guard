const mongoose = require('mongoose');

const PasswordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    username: {
        type: String, // Username for the stored account
        required: false
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    category: {
        type: String,
        enum: ['Email', 'Banking', 'Social Media', 'Work', 'Other'],
        default: 'Other'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastRotated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Password', PasswordSchema);
