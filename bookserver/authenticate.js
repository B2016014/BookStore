const jwt = require('jsonwebtoken');
const User = require('./models/user');
const config = require('./config')

const authenticate = (req, res, next) => {
    console.log(req.headers);
    const { authorization } = req.headers;
    console.log("authorization"+authorization);
    if (!authorization) {
        return res.status(401).json({ error: "token required" });
    }

    const token = authorization.split(' ')[1];
    console.log("Token"+token);
    try {
        const { userId } = jwt.verify(token, config.secretKey);
        console.log("auth id " + userId);
        User.findOne({ '_id': userId })
            .then((user) => {
                req.user = user;
                console.log("acuth " + req.user);
                next();
            })
            .catch((error) => {
                console.error('Error finding user:', error);
                res.status(500).json({ error: 'Something went wrong' });
            });

    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Request token is not autenticated" });
    }
}
module.exports=authenticate;
