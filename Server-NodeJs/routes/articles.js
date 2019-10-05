const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../model/article');
const ObjectId = require('mongoose').Types.ObjectId; // generate _id
const jwtLogin = require('jwt-login'); //jwt login logout


// jwt login authorize
const valid_login = (req, res, next) => {
    try {
        req.jwt = jwtLogin.validate_login(req, res)
        next();
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Error",
            error: err
        });
    }
} 

// get the articles from the database
router.get('/', (req, res, next) => {
    Article.find()
    .select('title description authorId')
    .populate('author')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            articles: docs
        }
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(404).json({
            success: false,
            message: "Could not get the articles from the database",
            error: err
        });
    });
});

// add a article using post routes
router.post('/add', valid_login, (req, res) => {
    const article = new Article({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        author: req.body.authorId,
    });
    article.save((err) => {
        if(err) {
            res.status(401).json({
                success: false,
                message: 'Could not add a Article'
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Article Added Successfully'
            });
        }
    });
});

// get single article
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Article.findById(id)
    .select('title description email')
    .populate('author')
    .exec()
    .then(doc => {
        console.log("from database", doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message:"No Article found for provided Id"
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal server error",
            error:err
        });
    });
});


// Update Submit POST Route
router.put('/:id',valid_login, function(req, res){
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("no article in given id:" `${req.params.id}`);
    const UpdateArticle = {
        title: req.body.title,
        description: req.body.description,
    };
    Article.findByIdAndUpdate(req.params.id, {$set: UpdateArticle}, {new: true}, (err, doc) => {
        if(!err) {
            res.send(doc);
            res.json({
                message:" Article updated",
                success: true
            });
        } else {
            console.log("Error in Article Update: " + JSON.stringify(err, undefined, 2));
        }
    });

  });

  // Delete Article
router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("no article in given id:" `${req.params.id}`);
   
    Article.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.status(200).json({
                success: true,
                message: "Article Deleted Successfully"
            });
        } else {
            res.status(404).json({
                success:false,
                message:"Could not Delete the article"
            });
            console.log("Error in Article Delete: " + JSON.stringify(err, undefined, 2));
        }
    });
});
// export the router
module.exports = router; 