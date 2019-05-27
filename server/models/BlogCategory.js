const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('express-validator');

const blogCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please supply blog category name',
        trim: true,
        unique: true,
        lowercase: true
    }
});

module.exports = mongoose.model('BlogCategory', blogCategorySchema);