const mongoose = require('mongoose');
const User = mongoose.model('User');

const createUser = async (user) => {
    const response = await User.create(user);
    return response;
}

const getUsers = async () => {
    const response = await User.find({});
    return response;
}

const getUserByTelephoneAndPassword = async (telephone, password) => {
    const response = await User.findOne({ telephone: telephone, password: password });
    return response;
}

const getUserByPhone = async (userPhone) => {
    const response = await User.findOne({ telephone: userPhone });
    return response;
}

module.exports = {
    createUser,
    getUsers,
    getUserByTelephoneAndPassword,
    getUserByPhone
}
