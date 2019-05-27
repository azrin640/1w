const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('express-validator');

const blogSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now(),
    },
    category: String,
    title: {
        type: String,
        required: 'Please supply blog title',
        lowercase: true
    },
    content: {
        type: String,
        required: 'Please supply blog content'
    },
    tags: String,
    image: String
});

module.exports = mongoose.model('Blog', blogSchema);