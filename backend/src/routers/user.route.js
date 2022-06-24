const express = require('express');
const routerUsers = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

routerUsers.post('', userController.postUser);
routerUsers.get('', verifyToken, userController.getUser);
routerUsers.get('/:telephone/:password', verifyToken, userController.getUserByTelephoneAndPassword);
routerUsers.post('/login', userController.login);

module.exports = routerUsers;
