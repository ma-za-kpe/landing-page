const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    url: {
        type: String,
        trim: true,
        required: [true, 'Please add an link please ...']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Link', LinkSchema, 'link');