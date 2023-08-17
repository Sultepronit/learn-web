const User = require('../model/User');
const jwt = require('jsonwebtoken');
//require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    // if there is no cookies or if then it doesn't contain .jwt
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    
    const foundUser = await User.findOne({ refreshToken }).exec();
    if(!foundUser) return res.sendStatus(403) // forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            console.log(decoded);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    userInfo: {
                        sername: decoded.username,
                        roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken };