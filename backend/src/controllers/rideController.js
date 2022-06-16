const rideService = require('../services/rideService');

const createRide = async (req, res) => {
    const ride = req.body;
    const response = await rideService.createRide(ride);
    res.status(response.statusCode).json(response.data);
}

const getRides = async (req, res) => {
    const response = await rideService.getRides();
    res.status(response.statusCode).json(response.data);
}

module.exports = {
    createRide,
    getRides
}
