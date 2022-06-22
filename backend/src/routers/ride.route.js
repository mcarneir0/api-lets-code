const rideController = require('../controllers/rideController');
const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');

router.post('', verifyToken, rideController.createRide);
router.get('', rideController.getRides);
router.get('/:userEmail', rideController.getRidesByUserEmail);
router.get('/:rideId/start', rideController.startRide);
router.get('/:rideId/end', rideController.endRide);

module.exports = router;
