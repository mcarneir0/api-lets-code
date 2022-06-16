const rideController = require('../controllers/rideController');
const express = require('express');
const router = express.Router();

router.post('', rideController.createRide);
router.get('', rideController.getRides);

module.exports = router;
