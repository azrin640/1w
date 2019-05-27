const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const BlogCategory = mongoose.model('BlogCategory');

exports.addBlogCategory = async (req, res, next) => {
    const blogCategory = new BlogCategory({
        name: req.body.name
    });
    const newBlogCategory = await blogCategory.save().catch((error) => {
        res.json(error);
    });
    if(newBlogCategory){
        res.json(newBlogCategory);
    }
};

exports.getCategories = async (req, res, next) => {
    const categories = await BlogCategory.find().catch((error) => {
        res.json(error);
    });

    if(categories){
        res.json(categories);
    }
}