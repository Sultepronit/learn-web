const User = require('../model/User');
const bcrypt = require('bcrypt');
// npm i dotenv jsonwebtoken cookie-parser   
const jwt = require('jsonwebtoken');
//require('dotenv').config();

async function handleLogin(req, res) {
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({ message: 'Username and password are required!' }); 
    const foundUser = await User.findOne({ username: user }).exec();
    console.log(foundUser);
    if(!foundUser) return res.sendStatus(401); // unauthorized

    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match) {
        const roles = Object.values(foundUser.roles);
        // create JWTs
        const accessToken = jwt.sign(
            { 
                UserInfo: {
                    username: foundUser.username,
                    roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        // 'jwt' is a random name of cookie
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', /* secure: true, */ maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };