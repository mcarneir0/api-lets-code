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

const getRidesByPhone = async (req, res) => {
    const { userPhone } = req.params;
    const response = await rideService.getRidesByPhone(userPhone);
    res.status(response.statusCode).json(response.data);
}

const updateRide = async (req, res) => {
    const { rideId } = req.params;
    const { newStatus } = req.body;
    const response = await rideService.updateRide(rideId, newStatus);
    res.status(response.statusCode).json(response.data);
}

module.exports = {
    createRide,
    getRides,
    getRidesByPhone,
    updateRide
}
