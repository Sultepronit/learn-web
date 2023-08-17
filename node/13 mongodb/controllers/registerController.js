const User = require('../model/User');
// mpm i bcrypt
const bcrypt = require('bcrypt');

async function handleNewUser(req, res) {
    const { user, pwd } = req.body;
    if(!user || !pwd) {
        return res.status(400).json({ mesage: 'Username and password are required' });
    }

    // check if this username already exists in db
    const duplicate = await User.findOne({ username: user }).exec();
    if(duplicate) return res.sendStatus(409); // conflict

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10); // password ecnrypted!

        // create and store new user
        const result = await User.create({
            username: user,
            password: hashedPwd
        });
        console.log(result);
        
        res.status(201).json({ success: `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleNewUser };