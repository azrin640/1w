const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Product =  mongoose.model('Product');
const User = mongoose.model('User');
const Category = mongoose.model('Category');
const { promisify } = require('es6-promisify');
require ('express-validator');
const uuidv4 = require('uuid/v4');

const jimp = require('jimp');


//*** CREATE A NEW PRODUCT ***
// Resize image with Jimp (specify width = 400px)
exports.resize = async (req, res, next) => {  
    console.log(req.file);
    //check if there is no new file to upload
    if (!req.file) {
        return next();
    }
    if(req.file){
        const extension = req.file.mimetype.split('/')[1];
        const fileName = `${uuidv4()}.${extension}`.toLowerCase();
        var buffer = req.file.buffer;
        
        //Now resize and upload file/photos to public/uploads
        const photo = await jimp.read(buffer);
        await photo.resize(400, jimp.AUTO);
        await photo.write(`src/assets/uploads/${fileName}`);
        res.json(fileName);
    }    
};
