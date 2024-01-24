const express = require('express');
const bodyParser = require('body-parser');
const authenticate=require('../authenticate')
const multer=require('multer')
const uploadRouter=express.Router();
const Users=require('../models/user');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images/profile');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const imageFileFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)){
        return cb(new Error('You can upload only image files!'),false);
    }
    cb(null,true);
};

const upload=multer({storage:storage,fileFilter:imageFileFilter});

uploadRouter.route('/')
.post(authenticate,upload.single('file'),(req,res,next)=>{
    console.log(req.file);  
    Users.findOne({_id:req.user._id})
    .then((user)=>{
        if(!user){
            return res.statusCode(404).json("User not found");
        }
        else{
            user.image=`images/profile/${req.file.filename}`;
            user.save()
            .then((user)=>{
                res.statusCode=200;
                res.setHeader("Content-Type", "application/json");
                res.json(user);
                console.log(user);
            })
            .catch((err)=>next(err))
        }
    })
    .catch((err)=>next(err));
})

module.exports=uploadRouter;