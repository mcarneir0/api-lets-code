const mongoose = require('mongoose');
const Ride = mongoose.model('Ride');

const createRide = async (ride) => {
    const response = await Ride.create(ride);
    return response;
}

const getRides = async () => {
    const response = await Ride.find();
    return response;
}

const getRideById = async (rideId) => {
    const response = await Ride.findById(rideId);
    return response;
}

const startRide = async (rideId) => {
    const response = await Ride.findByIdAndUpdate(rideId, {
        $set: {
            status: 'iniciada',
            startTime: new Date()
        }
    }, { new: true });
    return response;
}

const endRide = async (rideId) => {
    const response = await Ride.findByIdAndUpdate(rideId, {
        $set: {
            status: 'finalizada',
            finishTime: new Date()
        }
    }, { new: true });
    return response;
}

const getRidesByPhone = async (userPhone, page) => {
    const response = await Ride.paginate({
        'user.telephone': userPhone
    }, { page, limit: 10 });
    return response;
}

module.exports = {
    createRide,
    getRides,
    getRideById,
    startRide,
    endRide,
    getRidesByPhone
}
