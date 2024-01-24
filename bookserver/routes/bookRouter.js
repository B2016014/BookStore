const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Books= require('../models/book');
const bookRouter=express.Router();

bookRouter.route('/')
.get((req,res,next)=>{
    Books.find({})
    .then((Books)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Books);
    },(err)=>{next(err)})
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Books.create(req.body)
    .then((book)=>{
        console.log("Book created"+book);
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(book);
    },(err)=>{next(err)})
    .catch((err)=>{next(err)});
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operations is not supported on /books');
})

.delete((req,res,next)=>{
    Books.deleteMany({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    },(err)=>{next(err)})
    .catch((err)=>{next(err)})
})
// particular category
bookRouter.route('/category/:category')
.get((req,res,next)=>{
    const category = req.params.category;
    Books.find({ category })
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    },(err)=>{next(err)})
    .catch((err)=>{next(err)});
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operations is not supported on /books/category');
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operations is not supported on /books/category');
})

.delete((req,res,next)=>{
    const category = req.params.category;
    Books.deleteMany({category})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    },(err)=>{next(err)})
    .catch((err)=>{next(err)})
})
// particular book
bookRouter.route('/:id')
.get((req,res,next)=>{
    const bookId = req.params.id;
    Books.findOne({ _id: bookId })
    .then((book)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(book);
    },(err)=>{next(err)})
    .catch((err)=>{next(err)});
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operations is not supported on /books/id');
})
.put((req, res, next) => {
    Books.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((book) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next)=>{
    Books.findByIdAndDelete(req.params.id)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    },(err)=>{next(err)})
    .catch((err)=>{next(err)})
})
// search query
bookRouter.route('/search/:query')
.get((req,res,next)=>{
    const query = req.params.query;
    // Use the $or operator to search for documents with name or title matching the given parameter
    // Create text index on 'category' and 'title' fields
    Books.find({
        $text: { $search: query, $caseSensitive: false, $diacriticSensitive: false },
        $or: [
            { title: { $exists: true } },
            { category: { $exists: true } }
        ]
      })
    .then((books)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(books);
    },(err)=>{next(err)})
    .catch((err)=>{next(err)});
})



// comments
bookRouter.route('/:bookId/comments')
.get((req,res,next) => {
    Books.findById(req.params.bookId)
    .populate({path:'comments.author',model:'User'})
    .then((book) => {
        if (book != null) {
            console.log("Bookks "+book )
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(book.comments);
        }
        else {
            err = new Error('Book ' + req.params.bookId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate,(req, res, next) => {
    Books.findById(req.params.bookId)
    .then((book) => {
        if (book != null) {
            console.log(req.user);
            req.body.author = req.user._id;
            book.comments.unshift(req.body);
            book.save()
            .then((book) => {
                Books.findById(book._id)
                .populate({path:'comments.author',model:'User'})
                .then((book) => {
                    console.log("updated comment"+book.comments[0]);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(book);
                })            
            }, (err) => next(err));
        }
        else {
            err = new Error('Book ' + req.params.bookId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
module.exports=bookRouter;