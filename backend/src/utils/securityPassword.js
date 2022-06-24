const bcrypt = require('bcryptjs');

//  Configuração do salt
//  Determina a quantidade de saltos que serão feitos para criptografar a senha
const salt = bcrypt.genSaltSync(10);

//  Função para criptografar a senha
const encryptPassword = (password) => {
    return bcrypt.hashSync(password.toString(), salt);
}

//  Verifica se a senha é válida
const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password.toString(), hash);
}

module.exports = {
    encryptPassword,
    comparePassword
}
