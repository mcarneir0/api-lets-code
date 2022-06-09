const express = require('express');
const routerUsers = express.Router();
const userController = require('../controllers/userController');

routerUsers.post('', userController.postUser);
routerUsers.get('', userController.getUser);

module.exports = routerUsers;
