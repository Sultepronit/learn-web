const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsp = require('fs').promises;
const path = require('path');
// mpm i bcrypt
const bcrypt = require('bcrypt');

async function handleNewUser(req, res) {
    const { user, pwd } = req.body;
    if(!user || !pwd) {
        return res.status(400).json({ mesage: 'Username and password are required' });
    }

    const duplicate = usersDB.users.find(card => card.username === user);
    if(duplicate) return res.sendStatus(409); // conflict
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10); // password ecnrypted!
        console.log(hashedPwd);

        const newUser = { username: user, password: hashedPwd };
        usersDB.setUsers([...usersDB.users, newUser]);
        
        await fsp.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({ success: `New user${user} created!`});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleNewUser };