const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');


const cartSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },    
    products: [
        { 
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                autopopulate: true
            },
            qty: {
                type: Number,
                min: 0,
                default: 1
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    introducer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    weight: Number,
    shipBy: String,
    shipRate: Number,
    total: Number,
    paymentMethod: String,
    status: {
        code: Number,
        msg: String
    },
    paymentDate: Date,
    paymentImage: String,
    billplz: {
        id: String,
        collection_id: String,
        paid: Boolean,
        state: String,
        amount: Number,
        paid_amount: Number,
        due_at: Date,
        email: String,
        mobile: Number,
        name: String,
        url: String,
        reference_1_label: String,
        reference_1: String,
        reference_2_label: String,
        reference_2: String,
        redirect_url: String,
        callback_url: String,
        description: String,
        paid_at: Date
    }   
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

cartSchema.plugin(require('mongoose-autopopulate'));

// cartSchema.virtual('productInfo', {
//     ref: 'Product',
//     localField: 'products[{product}]',
//     foreignField: '_id'
// });

module.exports = mongoose.model('Cart', cartSchema);
