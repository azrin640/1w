const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Cart = mongoose.model('Cart');
const { promisify } = require('es6-promisify');
require ('express-validator');
const express = require('express');
const crypto = require('crypto');

// Validate Cart
exports.validateCart = (req, res, next) => {
    req.sanitizeBody('option');
    req.sanitizeBody('id');
    next();
}

// Create Cart
exports.checkout = async (req, res) => {

    const cart = req.body;
    
    const cartExist = await Cart.findOne({_id: cart.cart});
    if(!cartExist){
        res.json({
            status: 404,
            message: 'No cart found'
        });
    }

    const updateCart = await Cart.findOneAndUpdate({ _id: cart.cart }, cart);
    if(!updateCart){
        res.json({
            status: 304,
            message: 'Cart update failure'
        });
    }
    res.json(updateCart);
}


