const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');


const productSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String
    },
    name: {
        type: String,
        required: 'Please supply a title',
        trim: true
    },
    code: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },  
    price: {
        type: Number,
        required: 'Please supply a price'
    },
    salePrice: {
        type: Number,
        default: 0
    },
    description: {
        type: String    
    },    
    packagingSize: {
        type: String
    },
    packagingWeight: {
        type: Number,
        required: 'Please supply weight'
    },
    delivery: {
        type: String
    },
    image: {
        type: String
    }
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

module.exports = mongoose.model('Product', productSchema);
