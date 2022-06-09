const userService = require('../services/userService');

const postUser = async (req, res) => {
    const payload = req.body;
    const user = await userService.createUser(payload);
    return res.status(201).json(user);
}

const getUser = async (req, res) => {
    const user = await userService.getUsers();
    return res.status(200).json(user);
}

module.exports = {
    postUser,
    getUser
}
