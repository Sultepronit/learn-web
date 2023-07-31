const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const { writeFile } = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    // on client, also delete the accessToken

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt;

    // is there refreshToken in DB
    const foundUser = usersDB.users.find(card => card.refreshToken === refreshToken);
    /* if(!foundUser) { 
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        return res.sendStatus(204);
    } */
    if(foundUser) {
        // delete refreshToken in DB 
        const otherUsers = usersDB.users.filter(card => card.refreshToken !== refreshToken);
        const currentUser = { ...foundUser, refreshToken: '' };
        usersDB.setUsers([...otherUsers, currentUser]);
        await writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
    }

    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
    // secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout };