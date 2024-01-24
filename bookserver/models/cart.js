const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    books: [{
        book: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        count:{
            type:Number,
            default:0
        }
    }]
}, {
    timestamps: true
});

var Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;