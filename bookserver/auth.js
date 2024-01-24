const jwt = require("jsonwebtoken");
const config=require('./config')
exports.createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, config.secretKey, {
     expiresIn: duration,
   });
};