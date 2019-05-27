const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('express-validator');

const rateSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now(),
    },
    title: {
        type: String,
        required: 'Please supply rate title',
        lowercase: true
    },
    lt500: Number,
    lt750: Number, 
    lt1000: Number, 
    lt1250: Number,
    lt1500: Number, 
    lt1750: Number, 
    lt2000: Number,
    lt2500: Number, 
    lt3000: Number, 
    lt3500: Number, 
    lt4000: Number, 
    lt4500: Number, 
    lt5000: Number    
});

module.exports = mongoose.model('Rate', rateSchema);