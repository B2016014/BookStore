const mongoose = require('mongoose');
const Schema=mongoose.Schema;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var bookSchema =new Schema({
    domain:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    comments:[commentSchema]

},{
    timestamps:true
})
//Table will be Books
var books=mongoose.model('Book',bookSchema);
module.exports = books;