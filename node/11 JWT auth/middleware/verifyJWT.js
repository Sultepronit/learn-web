const jwt = require('jsonwebtoken');
require ('dotenv').config();

const verifyJWT = (req, res, next) => {
    console.log('here we go!');
    //const authHeader = req.headers.authorization;
    const authHeader = req.headers['authorization'];
    console.log('here we go2!');
    console.log(req.headers);
    if(!authHeader) return res.sendStatus(401); // unauthorized
    console.log('here we go3!');
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // forbidden - invalid token
            //req.user = decoded.userName;
            res.user = decoded.userName;
            next();
        }
    );
}

module.exports = verifyJWT;