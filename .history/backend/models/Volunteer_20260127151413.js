const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    aakNo: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    uniqueId: {
        type: Number
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    // NEW: Role Management
    role: {
        type: String,
        enum: ['soorveer yodha', 'president', 'vice-president'],
        default: 'soorveer yodha'
    },
    // Admin details who assigned role
    assignedBy: {
        adminEmail: String,
        assignedAt: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Update index
volunteerSchema.index({ role: 1 });
volunteerSchema.index({ aakNo: 1 });

module.exports = mongoose.model('Volunteer', volunteerSchema);