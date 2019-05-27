const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Cart = mongoose.model('Cart');
const User = mongoose.model('User');
const { promisify } = require('es6-promisify');
require ('express-validator');
const uuidv4 = require('uuid/v4');
const jimp = require('jimp');
const Billplz = require('billplz');
const billplz = new Billplz({
    'key': '43aafdf7-e30c-49bf-9053-06653ad8c688:',
    'sandboxEndpoint': true
});
const moment = require('moment');

var fileName;

exports.newCart = async(req, res) => {    
    const cart = new Cart();    
    const saveCart = await cart.save()
        .catch(error => res.json(error));
    if(saveCart){
        const newCart = await Cart.findOneAndUpdate(
            {_id: saveCart._id},
            {
                introducer: req.body.introducer,
                $push: {products: [{qty: req.body.qty, product: req.body.product._id}]}
            },
            {new: true}
        ).catch(error => res.json(error));
        if(newCart)res.json(newCart);
    }
};

exports.addToCart = async (req, res) => {  
    
    const cart = await Cart.findOne({_id: req.body._id}).catch(error => res.json(error));
    if(!cart) res.json({ status: 404 });
    if(cart){        
        cart.products.toString().includes(req.body.product._id) ? increaseQuantity(req.body) : pushCqp(req.body);
    }

    async function increaseQuantity(){
        const cart = await Cart.findOneAndUpdate(
            { _id: req.body._id},
            {
                $inc: { "products.$[elem].qty": +1}
            },
            { 
                arrayFilters: [{ "elem.product": mongoose.Types.ObjectId(req.body.product._id)}],
                new: true 
            }
        ).catch(error => res.json(error));
        if(cart) res.json(cart);
    };

    async function pushCqp(){
        const cart = await Cart.findOneAndUpdate(
            {_id: req.body._id},
            {
                $push: {products: [{qty: req.body.qty, product: req.body.product._id}]}
            },
            {new: true}
        ).catch(error => res.json(error));
        if(cart) res.json(cart);
    };           
};

exports.validateCart = (req, res, next) => {
    req.sanitizeBody('option');
    req.sanitizeBody('id');
    next();
};

exports.createCart = async (req, res) => {
    const cart = new Cart({
        introducer: req.body.introducer,
        status: req.body.status,
        products: [{product: req.body.product, qty: req.body.qty}]
    });

    const newCart = await cart.save()
        .catch(error => {
            res.json(error);
        });
    
    if(newCart){
        let cart = await Cart.findOne({_id: newCart._id})
            .catch(error => {
                res.json(error);
            });
        if(cart){
            res.json(cart);
        }
    }
};

exports.addProduct = async (req, res) => {  
    const cart = await Cart.findOneAndUpdate(
        {_id: req.body.cartId},
        {
            products: [
                {qty: req.body.cqp.qty, product: req.body.cqp.product}
            ]
        },
        {
            new: true
        }
    );
    if(cart) res.json(cart);
};

exports.getCart = async(req, res) => {
    const cart = await Cart.findOne({_id: req.body.cartId})        
        .catch(error => {
            res.json(error);
        });    
    if(cart){
        res.json(cart);
    }   
}

exports.getCarts = async(req, res) => {
    const carts = await Cart.getCartList();
    if(!carts){
        res.json({
            code: 404,
            message: 'Cart not found'
        });
    }
    res.json(carts);
};

exports.getCartsByUserId = async (req, res) => {

    const carts = await Cart.find(
        { user: req.body.userId}
    ).catch(error => res.json(error));

    if(carts){
        carts
            .sort((a, b) => {
                return a.created - b.created;
            })
            .reverse();
        res.json(carts);
    }
}

exports.increaseCart = async (req, res) => {
    const cart = await Cart.findOneAndUpdate(
        { _id: req.body._id},
        {
            $inc: { "products.$[elem].qty": +1}
        },
        { 
            arrayFilters: [{ "elem.product": mongoose.Types.ObjectId(req.body.product)}],
            new: true 
        }
    ).catch(error => res.json(error));
    if(cart) res.json(cart);
};

exports.decreaseCart = async (req, res) => {
    const cart = await Cart.findOneAndUpdate(
        { _id: req.body._id},
        {
            $inc: { "products.$[elem].qty": -1}
        },
        { 
            arrayFilters: [{ "elem.product": mongoose.Types.ObjectId(req.body.product)}],
            new: true 
        }
    ).catch(error => res.json(error));
    if(cart) res.json(cart);       
};

exports.approveOrder = async (req, res) => {
    if(req.body.status === 'approved'){
        return;
    }
    const cart = await Cart.findOneAndUpdate(
        { owner: req.body.purchaser._id },
        { 
            status: 'approved',
            approved: true
        },
        {
            new: true
        },
        (err) => {
            if(err){
                res.json(err);
            }
        });
    if(cart){
        const approvedCart = await Cart.getApprovedCart(cart._id);
        res.json(approvedCart[0]);
    }
}

exports.deleteOrder = async (req, res) => {
    const cart = await Cart.findOneAndRemove({owner: req.body.owner});
    if(!cart){
        res.json({
            code: 404,
            message: 'Cart not found'
        });
    }
    res.json(cart);
}

exports.getUserCart = async (req, res) => {

    const info = [];
    const carts = await Cart.getUserRelatedCarts(req.body._id);
    info.push(carts);
    const income = await Cart.totalIncome(req.body._id);
    const userCart = await Cart.findOne({owner: req.body._id});

    if(userCart.amount === 150 && userCart.status === 'approved'){
        var total = 0;
        for(var i=0; i<income.length; i++){
            
            if(income[i]._id === 1){
                var sum = income[i].total * 0.3;
            }
            if(income[i]._id === 2){
                var sum = income[i].total * 0.1;
            }
            if(income[i]._id === 3){
                var sum = income[i].total * 0.07;
            }
            if(income[i]._id === 4){
                var sum = income[i].total * 0.033;
            }
            if(income[i]._id === 5){
                var sum = income[i].total * 0.033;
            }
            
            total = total + sum;
        }        
    }
    if(userCart.amount === 500 && userCart.status === 'approved'){
        var total = 0;
        for(var i=0; i<income.length; i++){
            
            if(income[i]._id === 1){
                var sum = income[i].total * 0.33;
            }
            if(income[i]._id === 2){
                var sum = income[i].total * 0.1;
            }
            if(income[i]._id === 3){
                var sum = income[i].total * 0.07;
            }
            if(income[i]._id === 4){
                var sum = income[i].total * 0.07;
            }
            if(income[i]._id === 5){
                var sum = income[i].total * 0.07;
            }
            
            total = total + sum;
        }        
    }
    if(userCart.amount === 1500 && userCart.status === 'approved'){
        var total = 0;
        for(var i=0; i<income.length; i++){
            
            if(income[i]._id === 1){
                var sum = income[i].total * 0.36;
            }
            if(income[i]._id === 2){
                var sum = income[i].total * 0.1;
            }
            if(income[i]._id === 3){
                var sum = income[i].total * 0.1;
            }
            if(income[i]._id === 4){
                var sum = income[i].total * 0.07;
            }
            if(income[i]._id === 5){
                var sum = income[i].total * 0.07;
            }
            
            total = total + sum;
        }        
    }
    total = { total };
    info.push(total);
    res.json(info);
};

exports.addBulkProduct = async (req, res) => {

    const cart = await Cart.findOne({_id: req.body.cartId}).catch(error => res.json(error));

    if(cart){
        const cartString = cart.products.toString();

        const savedCart = cartString.includes(req.body.productId) ? 
           await Cart.findOneAndUpdate(
                {_id: req.body.cartId},
                { $set: { "products.$[elem].qty": req.body.qty}},
                {
                    arrayFilters: [{ "elem.product": mongoose.Types.ObjectId(req.body.productId)}],
                    new: true
                }
            )
            :
            await Cart.findOneAndUpdate(
                {_id: req.body.cartId},
                { $push: { "products": { "product": req.body.productId, "qty": req.body.qty}}},
                { new: true}
            );
        
        if(savedCart){
            
            res.json(savedCart);
        }
    }    
};

exports.updateCart = async (req, res) => {

    const cartId = req.body._id;
    const weight = req.body.weight;
    const shipBy = req.body.shipBy;
    const shipRate = req.body.shipRate;
    const total = req.body.total;
    const status = req.body.status;
    const user = req.body.user;
    const introducer = req.body.introducer;

    if(user){
        let cart = await Cart.findOneAndUpdate(
            {_id: cartId},
            {
                weight : weight,
                shipBy : shipBy,
                shipRate : shipRate,
                total : total,
                status : status,
                user : user
            },
            {new: true}
        ).catch(error => res.json(error));
        if(cart) res.json(cart);
    }                                 
    if(introducer){
        let cart = await Cart.findOneAndUpdate(
            {_id: cartId},
            {
                weight : weight,
                shipBy : shipBy,
                shipRate : shipRate,
                total : total,
                status : status,
                introducer: introducer
            },
            {new: true}
        ).catch(error => res.json(error));
        if(cart) res.json(cart);
    }
    if(user && introducer){
        let cart = await Cart.findOneAndUpdate(
            {_id: cartId},
            {
                weight : weight,
                shipBy : shipBy,
                shipRate : shipRate,
                total : total,
                status : status,
                user : user,
                introducer: introducer
            },
            {new: true}
        ).catch(error => res.json(error));
        if(cart) res.json(cart);
    }
    
}

exports.checkoutCart = async (req, res) => {  
    const _id = req.body._id;
    const paymentMethod = req.body.paymentMethod;
    const status = req.body.status;

    if(paymentMethod ==='billplz'){

        
    }
    if(paymentMethod === 'manual'){
        const cart = await Cart.findOneAndUpdate({ _id }, { paymentMethod, status }, { new: true })
            .catch(error => res.json(error));
        if(cart) res.json(cart);
    }
}

exports.resize = async (req, res, next) => {  
    
    //check if there is no new file to upload
    if (!req.file) {
        return next();
    }
    if(req.file){
        const extension = req.file.mimetype.split('/')[1];
        
        const fileName = `${uuidv4()}.${extension}`.toLowerCase();
        this.fileName = fileName;
        var buffer = req.file.buffer;
        
        //Now resize and upload file/photos to public/uploads
        const photo = await jimp.read(buffer);
        await photo.resize(400, jimp.AUTO);
        await photo.write(`src/assets/uploads/${fileName}`);
        return next();
    }    
};

exports.paymentCart = async (req, res) => {
    let paymentImage = this.fileName;
    const cart = await Cart.findOneAndUpdate(
        { _id: req.body._id},
        {
            paymentDate: req.body.paymentDate,
            paymentImage,
            status: {
                code: 5,
                msg: 'payment made, awaiting approval'
            }
        },
        {new: true}
    ).catch(error => res.json(error));

    if(cart){
        res.json(cart);
    }


};

exports.billplz = async (req, res) => {
    const cartId = req.body._id;
    const status = req.body.status;
    const paymentMethod = req.body.paymentMethod;

    const cart = await Cart.findOneAndUpdate(
        { _id: cartId },
        {
            status,
            paymentMethod
        },
        {
            new: true
        }

    ).catch(error => res.json(error));

    if(cart) {
        billplz.create_bill({
            collection_id: 'i1ztsiwe',
            description: `Payment for ${cart._id}`,
            email: cart.user.email,
            name: cart.user.name,
            amount: cart.total,
            callback_url: "http://example.com/webhook/",
            redirect_url: "http://localhost:4200/thank-you",
            due_at: moment().add(1, 'days').calendar(),
            reference_1: cart._id 
          }, async (err, response) => {
                if(!err) {

                    let updatedCart = await Cart.findOneAndUpdate(
                       {_id: cart._id},
                       {billplz: response},
                       {new: true}
                    ).catch(error => res.json(error));

                    if(updatedCart) res.json(updatedCart);

                }
                else if(err) res.json(err);
          }
        )

    }
};

exports.getAllCheckedOutCarts = async (req, res) => {
    const carts = await Cart.find(
        {"status.code": 5}
    ).catch(error => res.json(error));

    if(carts) res.json(carts);
}