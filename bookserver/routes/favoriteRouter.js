const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Favorites= require('../models/favorites');
const authenticate = require('../authenticate');
const favoriteRouter=express.Router();

favoriteRouter.use(authenticate)
favoriteRouter.route('/')
.get((req, res, next) => {
    Favorites.find({})
        .populate({path:'user',model:'User'})
        .populate({path:'books',model:'Book'})
    
        .then((favorites) => {
            if (favorites) {
                console.log(favorites)
                user_favorites = favorites.filter(fav => fav.user._id.toString() === req.user._id.toString())[0];
                if (user_favorites) {
                    console.log("inside user_fav"+user_favorites['books'])
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user_favorites);
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json("You have no favorites");
                }
            }
            else {
                var err = new Error('There are no favorites!');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
})
favoriteRouter.route('/:id')
.post((req, res, next) => {
        Favorites.find({})
            .populate({path:'user',model:'User'})
            .populate({path:'books',model:'Book'})
            .then((favorites) => {
                console.log(favorites)
                var user;
                if(favorites)
                    user = favorites.filter(fav => fav.user._id.toString() === req.user._id.toString())[0];
                if(!user) 
                    user = new Favorites({user: req.user._id});
                if(!user.books.find((b_id) => {
                    if(b_id._id)
                        return b_id._id.toString() === req.params.id.toString();
                }))
                user.books.push(req.params.id);
        
                user.save()
                    .then((userFavs) => {
                        res.statusCode = 201;
                        res.setHeader("Content-Type", "application/json");
                        res.json(userFavs);
                        console.log("favorites Created"+userFavs);
                    }, (err) => next(err))
                    .catch((err) => next(err));

            })
            .catch((err) => next(err));
})
.delete((req,res,next)=>{
    Favorites.find({})
        .populate({path:'user',model:'User'})
        .populate({path:'books',model:'Book'})
        .then((favorites)=>{
            console.log("fav"+favorites);
            var user=null;
            if(favorites){
                user=favorites.filter((fav)=>fav.user._id.toString()===req.user._id.toString())[0];
            }
            if(user){
                console.log("user "+user);
                console.log("books of user" + user.books);
                user.books=user.books.filter((book)=>(book._id.toString()!=req.params.id.toString()))
            }
            user.save()
            .then((userFavs)=>{
                res.statusCode=200;
                res.setHeader("Content-Type","application/json");
                res.json(userFavs);
                console.log("deleted succesffully")
            },(err)=>{next(err)})
            .catch((err)=>{console.log(err)});           
        },(err)=>{next(err)})
        .catch((err)=>next(err));
})
module.exports=favoriteRouter;