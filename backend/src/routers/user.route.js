const express = require('express');
const routerUsers = express.Router();
const userController = require('../controllers/userController');

routerUsers.post('', userController.postUser);
routerUsers.get('', userController.getUser);
routerUsers.get('/:telephone/:password', userController.getUserByTelephoneAndPassword);
routerUsers.post('/login', userController.login);

module.exports = routerUsers;
