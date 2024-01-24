const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
   username:{
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   image:{
      type:String
   },
   phoneNumber:{
      type:Number
   },
   alternateNumber:{
      type:Number
   },
   address:{
      type:String
   }
},{
   timestamps: true
})
var users=mongoose.model('User', userSchema);
module.exports = users;