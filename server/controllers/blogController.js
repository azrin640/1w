const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const BlogCategory = mongoose.model('BlogCategory');
const Blog = mongoose.model('Blog');
const jimp = require('jimp');
const uuidv4 = require('uuid');

var fileName;

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

// *** CREATE BLOG POST ***

exports.resize = async (req, res, next) => { 
    //check if there is no new file to upload
    if (!req.file) {
        res.json('No image detected');
        // return next();
    }
    if(req.file){
        
        const extension = req.file.mimetype.split('/')[1];
        const fileName = `${uuidv4()}.${extension}`.toLowerCase();        
        this.fileName = fileName;
        var buffer = req.file.buffer;        
        
        //Now resize and upload file/photos to public/uploads
        const photo = await jimp.read(buffer);
        await photo.resize(1200, jimp.AUTO);
        await photo.write(`src/assets/uploads/${fileName}`);
        return next();
    }    
};

exports.createBlog = async (req, res) => {
    const blogPost = new Blog({
        category: req.body.category,
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        image: this.fileName
    });

    const blog = await blogPost.save()
        .catch((error) => {
            res.json(error);
        });
    if(blog){
        res.json(blog);
    }
};

exports.getBlog = async (req, res) => {
    const blog = await Blog.findOne({_id: req.body._id}).catch(
        (error) => {
            res.json(error);
        }
    );

    if(blog){
        res.json(blog);
    }
}

exports.getBlogs = async (req, res, next) => {
    const blogs = await Blog.find().catch(
        (error)=> {
            res.json(error);
        }
    );

    if(blogs){
        res.json(blogs);
    }
}

exports.getBlogPosts = async (req, res, next) => {
    const blogs = await Blog.find().catch(
        (error)=> {
            res.json(error);
        }
    );

    if(blogs){
        res.json(blogs);
    }
}

exports.editBlog = async (req, res) => {
    const blog = await Blog.findOneAndUpdate(
        {_id: req.body.id},
        { 
            category: req.body.category,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            image: this.fileName
        },
        {new: true}
    ).catch((error)=> {
        res.json(error);
    });

    if(blog){
        res.json(blog);
    }
}

exports.editBlogNoImage = async (req, res) => {
    const blog = await Blog.findOneAndUpdate(
        {_id: req.body.id},
        { 
            category: req.body.category,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            image: req.body.image
        },
        {new: true}
        ).catch((error) => {
            res.json(error)
        });

        if(blog){
            res.json(blog);
        }
}

exports.deleteBlog = async (req, res) => {
    const blog = await Blog.findOneAndDelete({ _id: req.body.id})
        .catch((error) => {
            res.json(error);
        });
    
    if(blog){
        res.json(blog);
    }
}
