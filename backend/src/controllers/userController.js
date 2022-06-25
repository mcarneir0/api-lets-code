const userService = require('../services/userService');

const postUser = async (req, res) => {
    const user = req.body;
    const response = await userService.createUser(user);
    return res.status(response.statusCode).json(response.data);
}

const getUser = async (req, res) => {
    const response = await userService.getUsers();
    return res.status(response.statusCode).json(response.data);
}

const getUserByTelephoneAndPassword = async (req, res) => {
    const { telephone, password } = req.params;
    const response = await userService.getUserByTelephoneAndPassword(telephone, password);
    return res.status(response.statusCode).json(response.data);
}

const login = async (req, res) => {
    const { telephone, password } = req.body;
    const response = await userService.login(telephone, password);
    return res.status(response.statusCode).json(response.data);
}

const deleteUserByPhone = async (req, res) => {
    const { telephone } = req.params;
    const response = await userService.deleteUserByPhone(telephone);
    return res.status(response.statusCode).json(response.data);
}

module.exports = {
    postUser,
    getUser,
    getUserByTelephoneAndPassword,
    login,
    deleteUserByPhone
}
