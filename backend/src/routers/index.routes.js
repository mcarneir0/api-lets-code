const userRouters = require('./user.route');
const express = require('express');
const router = express.Router();

router.use('/user', userRouters);

module.exports = router;
