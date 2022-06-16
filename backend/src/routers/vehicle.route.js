const vehicleController = require('../controllers/vehicleController');
const express = require('express');
const router = express.Router();

router.post('', vehicleController.createVehicle);
router.get('', vehicleController.getVehicles);

module.exports = router;
