const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');


const mailSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        required: 'Please supply an email',
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: 'Please supply a message',
        trim: true
    }
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

module.exports = mongoose.model('Mail', mailSchema);
