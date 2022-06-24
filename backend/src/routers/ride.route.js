const rideController = require('../controllers/rideController');
const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');

router.post('', verifyToken, rideController.createRide);
router.get('', rideController.getRides);
router.get('/users/:userPhone', verifyToken, rideController.getRidesByPhone);
router.patch('/:rideId', verifyToken, rideController.updateRide);

module.exports = router;
