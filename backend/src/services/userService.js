//  Utilizando a tabela Users do banco de dados
const mongoose = require('mongoose');
const User = mongoose.model('User');

const createUser = async user => {
    return await User.create(user);
}

const getUsers = async () => {
    return await User.find();
}

//  Tornando as funções disponíveis para outros arquivos
module.exports = {
    createUser,
    getUsers
}
