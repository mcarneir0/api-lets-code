const userRouters = require('./user.route');
const vehicleRouters = require('./vehicle.route');
const rideRouters = require('./ride.route');
const express = require('express');
const router = express.Router();

router.use('/user', userRouters);
router.use('/vehicle', vehicleRouters);
router.use('/rides', rideRouters);

module.exports = router;
