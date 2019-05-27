const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');


const walletSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    bank: {
        type: String,
    },
    bankNo: {
        type: Number,
    },
    total: {
        type: Number
    },
    approved:{
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    }
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

module.exports = mongoose.model('Wallet', walletSchema);
