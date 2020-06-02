const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please add an username please ...']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please add an email please ...']
    },
    url: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please add an link please ...']
    },
    project: {
        type: String,
        trim: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Weather', LinkSchema, 'weather');