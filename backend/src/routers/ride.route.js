const rideController = require('../controllers/rideController');
const express = require('express');
const router = express.Router();

router.post('', rideController.createRide);
router.get('', rideController.getRides);
router.get('/:userEmail', rideController.getRidesByUserEmail);
router.get('/:rideId/start', rideController.startRide);
router.get('/:rideId/end', rideController.endRide);

module.exports = router;
