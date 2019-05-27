const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Rate = mongoose.model('Rate');

exports.newRate = async (req, res) => {
    
    const newRate = new Rate({
        title: req.body.title,
        lt500: req.body.lt500,
        lt750: req.body.lt750,
        lt1000: req.body.lt1000,
        lt1250: req.body.lt1250,
        lt1500: req.body.lt1500,
        lt1750: req.body.lt1750,
        lt2000: req.body.lt2000,
        lt2500: req.body.lt2500,
        lt3000: req.body.lt3000,
        lt3500: req.body.lt3500,
        lt4000: req.body.lt4000,
        lt4500: req.body.lt4500,
        lt5000: req.body.lt5000
    });
    
    const rate = await newRate.save().catch(error => res.json(error));
    if(rate){
        res.json(rate);
    }

}

exports.getRates = async (req, res) => {
    const rates = await Rate.find().catch(error => res.json(error));
    
    if(rates){
        res.json(rates);
    }


}

