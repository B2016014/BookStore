const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cart= require('../models/cart');
const authenticate = require('../authenticate');
const cartRouter=express.Router();

cartRouter.use(authenticate)
cartRouter.route('/')
.get((req, res, next) => {
    Cart.find({})
        .populate({path:'user',model:'User'})
        .populate({
                    path:'books.book',
                    model:'Book' 
            })
        .then((cart) => {
            if (cart) {
                console.log(cart)
                user_cart = cart.filter(item => item.user._id.toString() === req.user._id.toString())[0];

                if (user_cart) {
                    console.log("inside user_fav"+user_cart['books'])
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user_cart);
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json("You have no items in cart");
                }
            }
            else {
                var err = new Error('There is no cart!');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
})
cartRouter.route('/:id')
.post((req, res, next) => {
        Cart.find({})
            .populate({path:'user',model:'User'})
            .populate({path:'books.book',model:'Book'})
            .then((cart) => {
                console.log(cart)
                var user;
                if(cart)
                    user = cart.filter(item => item.user._id.toString() === req.user._id.toString())[0];
                if(!user) 
                    user = new Cart({user: req.user._id});
                if(!user.books.find((d_id) => {
                    if(d_id._id)
                        return d_id._id.toString() === req.params.id.toString();
                })){
                     user.books.push({ book: req.params.id, count: 1 });
                }
                else{
                    const existingBook = user.books.find((item) => item.book._id.toString() === req.params.id.toString());
                    existingBook.count += 1;
                }
                user.save()
                    .then((userCart) => {
                        res.statusCode = 201;
                        res.setHeader("Content-Type", "application/json");
                        res.json(userCart);
                        console.log("cart Created "+userCart.books);
                    }, (err) => next(err))
                    .catch((err) => next(err));

            })
            .catch((err) => next(err));
})
.delete((req,res,next)=>{
    Cart.find({})
        .populate({path:'user',model:'User'})
        .populate({path:'books.book',model:'Book'})
        .then((cart)=>{
            console.log("cart"+cart);
            var user=null;
            if(cart){
                user=cart.filter((fav)=>fav.user._id.toString()===req.user._id.toString())[0];
            }
            if(user){
                console.log("user "+user);
                console.log("books of user" + user.books);
                user.books=user.books.filter((item)=>(item.book._id.toString()!=req.params.id.toString()))
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

cartRouter.route('/bookInc/:id')
.post((req,res,next)=>{
    console.log("inc")
    Cart.find({})
        .populate({path:'user',model:'User'})
        .populate({path:'books.book',model:'Book' })
        .then((cart) => {
                console.log("cart"+cart)
                var user;
                if(cart)
                    user = cart.filter(item => item.user._id.toString() === req.user._id.toString())[0];
                const existingBook = user.books.find((item) => item.book._id.toString() === req.params.id.toString());
                existingBook.count =req.body.count;
                user.save()
                    .then((userCart) => {
                        res.statusCode = 201;
                        res.setHeader("Content-Type", "application/json");
                        res.json(userCart);
                        console.log("cart Created "+userCart.books);
                    }, (err) => next(err))
                    .catch((err) => next(err));

            })
            .catch((err) => next(err));
})
module.exports=cartRouter;