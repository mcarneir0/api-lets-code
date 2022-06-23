const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//  Trabalhando com um objeto de retorno padrão
//  statusCode: armazena o código de status da requisição
//  data: armazena o conteúdo da requisição
//      pode ser um objeto, um array ou uma string

const createUser = async (user) => {

    //  Validar os parâmetros do usuário
    if (!user) {
        return {
            statusCode: 400,
            data: { message: 'Não foi possível criar o usuário. Os parâmetros não foram informados corretamente.' }
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
            data: { message: 'Não foi possível fazer o login. Os parâmetros não foram informados corretamente.' }
        }
    }

    //  Verificar se o usuário existe
    let user;
    try {
        user = await userRepository.getUserByTelephoneAndPassword(telephone, password);
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

    //  Se o usuário existir, gerar o token
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

//  Tornando as funções disponíveis para outros arquivos
module.exports = {
    createUser,
    getUsers,
    getUserByTelephoneAndPassword,
    login
}
