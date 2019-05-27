const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const contactController = require('../controllers/contactController');
const checkoutController = require('../controllers/checkoutController');
const walletController = require('../controllers/walletController');
const blogController = require('../controllers/blogController');
const rateController = require('../controllers/rateController');
const testController = require('../controllers/testController');
const { catchErrors } = require('../handlers/errorHandlers');

const multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/user/pc', 
    userController.getUserPcInfo
);

// ** USER **

router.post('/user', 
    catchErrors(userController.isLoggedIn),
    userController.validateRegister,
    catchErrors(userController.getUser)
);

router.post('/user/registration',
    catchErrors(userController.registration)
);

router.post('/user/new', 
    catchErrors(userController.isLoggedIn),
    catchErrors(userController.adminRegister)
);

router.post('/user/username', 
    catchErrors(userController.getUserByUsername)
);

router.post('/users',
    catchErrors(userController.isLoggedIn),
    catchErrors(userController.getUsers)
);

router.post('/users/search',
    catchErrors(userController.searchUsers)
);

router.post('/user/edit',
    catchErrors(userController.isLoggedIn),
    catchErrors(userController.editUser)
);

router.post('/user/google/address', 
    userController.googleAddress
);

router.post('/user/introducer/id', 
    catchErrors(userController.getIntroducerId)
);

router.post('/user/username/autocomplete', 
    catchErrors(userController.getUsernameAutocomplete)
)

router.post('/register', 
    userController.validateRegister,
    catchErrors(userController.register)
);

router.post('/user/remove', catchErrors(userController.removeUser));

router.post('/login', 
    userController.validateLogin,
    userController.login
);

// ** PRODUCT **

router.post('/product/category', 
    catchErrors(userController.isLoggedIn),
    catchErrors(productController.createCategory)
);

router.post('/product',
    catchErrors(productController.getProduct)
);

router.get('/product/:id',
    catchErrors(productController.getProductById)
);

router.post('/product/update/:id', 
    catchErrors(productController.updateProduct)
);

router.post('/product/bulk', 
    catchErrors(cartController.addBulkProduct)
)

router.post('/product/category/delete',
    catchErrors(productController.deleteProductCategory)
);

router.post('/product/category/update', 
    catchErrors(productController.updateProductCategory)
);

router.post('/admin/product/new',
    upload.single('image'), function (req, res, next){
        const isFile = req.file.mimetype.startsWith('image/');
        if(isFile){
            return next();
        }else{
            res.json({status: 406, message: 'Not Acceptable'});
        }     
    },
    catchErrors(productController.resize),
    catchErrors(productController.createProduct)
);

router.post('/admin/product/edit/image',
    upload.single('image'), function (req, res, next){
        const isFile = req.file.mimetype.startsWith('image/');
        if(isFile){
            return next();
        }else{
            res.json({status: 406, message: 'Not Acceptable'});
        }     
    },
    catchErrors(productController.resize),
    catchErrors(productController.editProduct)
);

router.post('/admin/product/edit', 
    catchErrors(productController.editProductNoImage)
)

router.post('/admin/product/delete',
    catchErrors(productController.deleteProduct)
)

// ** PRODUCTS ** 
router.get('/products/categories', 
    catchErrors(productController.getProductsCategories)
);

router.get('/categories', 
    catchErrors(productController.getCategories)
);

router.get('/products', 
    catchErrors(productController.getProducts)
);

// ** CART **

router.post('/cart/new',
    catchErrors(cartController.newCart)
);

router.post('/cart/product/add',
    catchErrors(cartController.addToCart)
);

router.post('/cart/create',
    catchErrors(cartController.createCart)
);

router.post('/cart/add',
    catchErrors(cartController.addProduct)
);

router.post('/cart/get', 
    catchErrors(cartController.getCart)
);

router.post('/cart/decrease',
    catchErrors(cartController.decreaseCart)
);

router.post('/cart/increase',
    catchErrors(cartController.increaseCart)
)

router.post('/carts', 
    catchErrors(cartController.getCarts)
);

router.post('/carts/user', 
    catchErrors(cartController.getCartsByUserId)
)

router.post('/carts/getUserRelatedCarts', 
    catchErrors(cartController.getUserCart)
);

router.get('/carts/checkout',
    catchErrors(cartController.getAllCheckedOutCarts)
);

router.post('/cart/approve', 
    catchErrors(cartController.approveOrder)
);

router.post('/cart/delete', 
    catchErrors(cartController.deleteOrder)
);

router.post('/cart/update',
    catchErrors(cartController.updateCart)
);

router.post('/cart/checkout', 
    catchErrors(cartController.checkoutCart)
);

router.post('/cart/payment',
    upload.single('image'), function (req, res, next){
        const isFile = req.file.mimetype.startsWith('image/');
        if(isFile){
            return next();
        }else{
            res.json({status: 406, message: 'Not Acceptable'});
        }     
    },
    catchErrors(cartController.resize),
    catchErrors(cartController.paymentCart)
);

router.post('/cart/payment/billplz',
    catchErrors(cartController.billplz)
);

//  ** CHECKOUT **

router.post('/checkout',
    catchErrors(checkoutController.checkout)
);

// ** CONTACT **

router.post('/contact', 
    contactController.validateMail,
    catchErrors(contactController.sendMail)
);

router.post('/withdraw', 
    catchErrors(walletController.withdraw)
);

// ** BLOG **

router.post('/admin/blog/category/new',    
    catchErrors(blogController.addBlogCategory)
);

router.get('/admin/blog/categories', 
    catchErrors(blogController.getCategories)
);

router.post('/admin/blog/new', 
    upload.single('image'), function (req, res, next){
        const isFile = req.file.mimetype.startsWith('image/');
        if(isFile){
            return next();
        }else{
            res.json({status: 406, message: 'Not Acceptable'});
        }     
    },
    catchErrors(blogController.resize),
    catchErrors(blogController.createBlog)
);

router.post('/admin/blog/get', 
    catchErrors(blogController.getBlog)
);

router.post('/admin/blog/edit',
    catchErrors(blogController.editBlogNoImage)
);

router.post('/admin/blog/edit/image',
    upload.single('image'), function (req, res, next){
        const isFile = req.file.mimetype.startsWith('image/');
        if(isFile){
            return next();
        }else{
            res.json({status: 406, message: 'Not Acceptable'});
        }     
    },
    catchErrors(blogController.resize),
    catchErrors(blogController.editBlog)
);

router.post('/admin/blog/delete', 
    catchErrors(blogController.deleteBlog)
);

router.get('/admin/blogs', 
    catchErrors(blogController.getBlogs)
);

router.get('/blogs/get', 
    catchErrors(blogController.getBlogPosts)
);

router.post('/blog/get', 
    catchErrors(blogController.getBlog)
);

// RATES

router.post('/admin/shipping/rate',
    catchErrors(rateController.newRate)
);

router.get('/admin/shipping/rate/get',
    catchErrors(rateController.getRates)
)


// TEST

router.post('/test', 
    upload.single('image'), function (req, res, next){
        const isFile = req.file.mimetype.startsWith('image/');
        if(isFile){
            return next();
        }else{
            res.json({status: 406, message: 'Not Acceptable'});
        }     
    },
    catchErrors(testController.resize)
);

module.exports = router;


