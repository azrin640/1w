const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Cart = mongoose.model('Cart');
const User = mongoose.model('User');
const Wallet = mongoose.model('Wallet');
const { promisify } = require('es6-promisify');
require ('express-validator');
const express = require('express');
const crypto = require('crypto');

exports.withdraw = async(req, res) => {
    const wallet = new Wallet ({
        owner: req.body.owner,
        bank: req.body.bank,
        bankNo: req.body.bankNo,
        total: req.body.total
    });
    const withdrawal = await wallet.save(function(err, result){
        if(result){
            res.json(result);
        }
        if(err){
            res.json(err);
        }
    })

}
