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

const startRide = async (req, res) => {
    const { rideId } = req.params;
    const response = await rideService.startRide(rideId);
    res.status(response.statusCode).json(response.data);
}

const endRide = async (req, res) => {
    const { rideId } = req.params;
    const response = await rideService.endRide(rideId);
    res.status(response.statusCode).json(response.data);
}

const getRidesByUserEmail = async (req, res) => {
    const { userEmail } = req.params;
    const response = await rideService.getRidesByUserEmail(userEmail);
    res.status(response.statusCode).json(response.data);
}

module.exports = {
    createRide,
    getRides,
    startRide,
    endRide,
    getRidesByUserEmail
}
