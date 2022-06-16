const vehicleService = require('../services/vehicleService');

const createVehicle = async (req, res) => {
    const vehicle = req.body;
    const response = await vehicleService.createVehicle(vehicle);
    res.status(response.statusCode).json(response.data);
}

const getVehicles = async (req, res) => {
    const response = await vehicleService.getVehicles();
    res.status(response.statusCode).json(response.data);
}

module.exports = {
    createVehicle,
    getVehicles
}
