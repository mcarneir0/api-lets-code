const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');

const createVehicle = async (vehicle) => {
    const response = await Vehicle.create(vehicle);
    return response;
}

const getVehicleByLicensePlate = async (plate) => {
    const response = await Vehicle.findOne({ licensePlate: plate });
    return response;
}

const getVehicles = async () => {
    const response = await Vehicle.find();
    return response;
}

module.exports = {
    createVehicle,
    getVehicleByLicensePlate,
    getVehicles
}
