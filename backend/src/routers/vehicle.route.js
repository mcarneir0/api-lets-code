const vehicleController = require('../controllers/vehicleController');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.post('', verifyToken, vehicleController.createVehicle);
router.get('', verifyToken, vehicleController.getVehicles);

module.exports = router;
