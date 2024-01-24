const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const config=require('../config');

const stripe = require('stripe')(config.stipe_secret_key);
const YOUR_DOMAIN=config.client_url;
const stripeRouter=express.Router();

stripeRouter.route('/create-checkout-session')
.post(async(req,res,next)=>{
    console.log(req.body.cart);
    const line_items=req.body.cart.map((item)=>{
        return {
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.book.title
                },
                unit_amount:Math.floor(item.book.price)*100
            },
            quantity:item.count
        }
    });
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success-payment`,
        cancel_url: `${YOUR_DOMAIN}/cancel-payment`,
      });
    
      return res.send({url:session.url});
});
module.exports=stripeRouter;