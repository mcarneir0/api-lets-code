//  Arquivo responsável por verificar todos os tokens de acesso
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //  Pegando o token do header
    //  O ['x-access-token'] é o nome que está sendo utilizado para identificar o token no header
    //  Este nome pode ser alterado para qualquer outro
    const token = req.headers['x-access-token'];

    //  Verificando se o token existe
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'Token não encontrado'
        });
    }

    //  Verificando se o token é válido
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                auth: false,
                message: 'Token inválido'
            });
        }
        req.userId = decoded.id;
        next();
    });
}
