const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const security = require('../utils/securityPassword');
require('dotenv').config();

//  Trabalhando com um objeto de retorno padrão
//  statusCode: armazena o código de status da requisição
//  data: armazena o conteúdo da requisição
//      pode ser um objeto, um array ou uma string

const createUser = async (user) => {

    //  Validar os parâmetros do usuário
    if (!user.name || !user.telephone || !user.password || !user.email) {
        return {
            statusCode: 400,
            data: { message: 'Não foi possível criar o usuário. Verifique se os campos foram preenchidos corretamente.' }
        }
    }

    //  Depois da validação, verificar se o usuário já existe
    try {
        const userExists = await userRepository.getUserByPhone(user.telephone);
        if (userExists) {
            return {
                statusCode: 409,
                data: { message: 'Usuário já cadastrado.' }
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro na verificação de usuário duplicado',
                error: error.message
            }
        }
    }

    //  Se não existir, criar o usuário
    try {
        user.password = security.encryptPassword(user.password);
        await userRepository.createUser(user);
        return {
            statusCode: 201,
            data: user
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: { 
                message: 'Não foi possível criar o usuário.',
                error: error.message
            }
        }
    }
}

const getUsers = async () => {
    try {
        const users = await userRepository.getUsers();
        return {
            statusCode: 200,
            data: users
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Não foi possível obter os usuários.',
                error: error.message
            }
        }
    }
}

const getUserByTelephoneAndPassword = async (telephone, password) => {
    try {
        const user = await userRepository.getUserByTelephoneAndPassword(telephone, password);
        if (user) {
            return {
                statusCode: 200,
                data: user
            }
        }
        else {
            return {
                statusCode: 404,
                data: { message: 'Usuário não encontrado.' }
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Não foi possível obter o usuário.',
                error: error.message
            }
        }
    }
}

const login = async (telephone, password) => {

    //  Verificar se os parâmetros foram informados
    if (!telephone || !password) {
        return {
            statusCode: 400,
            data: { message: 'Usuário ou senha não informados. Verifique se todos os campos foram preenchidos corretamente.' }
        }
    }

    //  Verificar se o usuário existe
    let user;
    try {
        user = await userRepository.getUserByPhone(telephone);
        if (!user) {
            return {
                statusCode: 404,
                data: { message: 'Usuário não encontrado.' }
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Não foi possível obter o usuário.',
                error: error.message
            }
        }
    }

    const hashPassword = user.password;
    const isPasswordValid = security.comparePassword(password, hashPassword);
    if (!isPasswordValid) {
        return {
            statusCode: 401,
            data: { message: 'Senha inválida.' }
        }
    }

    //  Se o usuário existir, gerar o token
    else {
        try {
            const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });
            return {
                statusCode: 200,
                data: {
                    auth: true,
                    token: token,
                    userId: user.id,
                    userName: user.name,
                    userPhone: user.telephone
                }
            }
        }
        catch (error) {
            return {
                statusCode: 500,
                data: {
                    message: 'Não foi possível gerar o token.',
                    error: error.message
                }
            }
        }
    }
}

//  Tornando as funções disponíveis para outros arquivos
module.exports = {
    createUser,
    getUsers,
    getUserByTelephoneAndPassword,
    login
}
