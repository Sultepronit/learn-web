const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) { this.users = data }
}
const bcrypt = require('bcrypt');
// npm i dotenv jsonwebtoken cookie-parser   
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsp = require('fs').promises;
const path = require('path');

async function handleLogin(req, res) {
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({ message: 'Username and password are required!' }); 
    const foundUser = usersDB.users.find(card => card.username === user);
    if(!foundUser) return res.sendStatus(401); // unauthorized

    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match) {
        // create JWTs
        const accessToken = jwt.sign(
            { uresname: foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const otherUsers = usersDB.users.filter(card => card.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        res.json({ success: `User ${user} is logged in!`});
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };