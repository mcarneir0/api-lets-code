const userRouters = require('./user.routes');
const express = require('express');
const router = express.Router();

router.use('/user', userRouters);

module.exports = router;
