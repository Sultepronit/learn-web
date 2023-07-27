const jwt = require('jsonwebtoken');
require ('dotenv').config();

const verifyJWT = (req, res, next) => {
    //console.log('here we go!');
    const authHeader = req.headers['authorization'];
   // console.log('here we go2!');
    //console.log(req.headers);
    //console.log(req.headers['authorization']);
    if(!authHeader) return res.sendStatus(401); // unauthorized
    //console.log('here we go3!');
    console.log(authHeader); // Bearer [token]
    const token = authHeader.split(' ')[1]; // [token]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // forbidden - invalid token
            req.user = decoded.username; // maybe it's a mistake, to change req, not a res... but I don't know....
            //res.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT;