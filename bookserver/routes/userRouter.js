const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../config');
const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT, } = require("../auth");
const authenticate = require('../authenticate');

const userRouter = express.Router();

userRouter.route('/signup')
    .post((req, res, next) => {
        {
            let { username, email, password } = req.body;
            if (!username) {
                return res.status(422).json("username required");
            }
            if (!email) {
                return res.status(422).json("password required");
            }
            if (!password) {
                return res.status(422).json("password required");
            }
            Users.findOne({ email: email })
                .then(user => {
                    if (user) {
                        return res.status(422).json("email already exists");
                    }
                    else {
                        const user = new Users({
                            username: username,
                            email: email,
                            password: password,
                        });
                        let access_token = createJWT(
                            user.email,
                            user._id,
                            3600
                        );
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(password, salt, function (err, hash) {
                                if (err) throw err;
                                user.password = hash;
                                user.save()
                                    .then(response => {
                                        res.status(200).json({
                                            success: true,
                                            token: access_token,
                                            message: user,
                                            result: response
                                        })
                                    })
                                    .catch(err => {
                                        res.status(500).json(err);
                                    });
                            });
                        });
                    }
                })
                .catch(err => {
                    res.status(500).json(err);
                })
        }
    })
userRouter.route('/login')
    .post((req, res, next) => {
        let { email, password } = req.body;
        if (!email) {
            return res.status(422).json("email required");
        }
        if (!password) {
            return res.status(422).json("password required");
        }
        Users.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return res.status(404).json("user not found");
                } else {
                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if (!isMatch) {
                                return res.status(400).json("Incorrect password");
                            }
                            let access_token = createJWT(
                                user.email,
                                user._id,
                                3600
                            );
                            jwt.verify(access_token, config.secretKey, (err,
                                decoded) => {
                                if (err) {
                                    res.status(500).json(err);
                                }
                                if (decoded) {
                                    return res.status(200).json({
                                        success: true,
                                        token: access_token,
                                        message: user
                                    });
                                }
                            });
                        }).catch(err => {
                            res.status(500).json(err);
                        });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })

userRouter.route('/Profile')
    .get(authenticate, (req, res, next) => {
        console.log("profile" + req.user)
        Users.findById(req.user._id)
            .then((user) => {
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.json(user);
                console.log("user details" + user);
            }, (err) => { next(err) })
            .catch((err) => { next(err) })
    })
userRouter.route('/Profile/update')
    .post(authenticate, (req, res, next) => {
        console.log("profile" + req.user)
        const updateFields = {};
        if (req.body.username) updateFields.username = req.body.username;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.phoneNumber) updateFields.phoneNumber = req.body.phoneNumber;
        if (req.body.alternateNumber) updateFields.alternateNumber = req.body.alternateNumber;
        if (req.body.address) updateFields.address = req.body.address;

        Users.findByIdAndUpdate(req.user._id, { $set: updateFields }, { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.json(user);
                console.log("user updated" + user);
            }, (err) => { next(err) })
            .catch((err) => { next(err) })
    })

userRouter.route('/checkJsonWebToken')
    .get((req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        if (decodedToken && decodedToken.exp) {
            // The 'exp' claim contains the expiration time in seconds since Unix epoch
            const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
            if (currentTime >= decodedToken.exp) {
                return res.status(200).json({
                    success: false
                });
            }
            else{
                return res.status(200).json({
                    success: true
                });
            }
        }
    })
module.exports = userRouter;