const rideRepository = require('../repositories/rideRepository');
const userRepository = require('../repositories/userRepository');
const vehicleRepository = require('../repositories/vehicleRepository');

const createRide = async (ride) => {

    //  Verifica se os dados da corrida foram preenchidos
    if (!ride) {
        return {
            statusCode: 400,
            data: { message: 'Dados da corrida não preenchidos' }
        }
    }

    const { user, vehicle, startPlace, finishPlace } = ride;

    //  Verifica se os dados do usuário foram preenchidos
    if (!user) {
        return {
            statusCode: 400,
            data: { message: 'Dados do usuário não preenchidos' }
        }
    }
    
    //  Verifica se o usuário existe de acordo com o email
    try {
        const userResponse = await userRepository.getUserByEmail(user.email);
        if (!userResponse) {
            return {
                statusCode: 404,
                data: { message: 'Usuário não encontrado' }
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro ao buscar usuário',
                error: error.message
            }
        }
    }

    //  Verifica se os dados do veículo foram preenchidos
    if (!vehicle) {
        return {
            statusCode: 400,
            data: { message: 'Dados do veículo não preenchidos' }
        }
    }

    //  Verifica se o veículo existe de acordo com a placa
    try {
        const vehicleResponse = await vehicleRepository.getVehicleByLicensePlate(vehicle.licensePlate);
        if (!vehicleResponse) {
            return {
                statusCode: 404,
                data: { message: 'Veículo não encontrado' }
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro ao buscar veículo',
                error: error.message
            }
        }
    }

    ride.status = 'pendente';

    //  Insere a corrida no banco de dados
    try {
        const rideResponse = await rideRepository.createRide(ride);
        return {
            statusCode: 201,
            data: rideResponse
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro ao criar corrida',
                error: error.message
            }
        }
    }
}

const getRides = async () => {
    try {
        const response = await rideRepository.getRides();
        return {
            statusCode: 200,
            data: response
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: { 
                message: 'Erro ao buscar corridas',
                error: error.message
            }
        }
    }
}

const getRidesByUserEmail = async (userEmail) => {

    try {
        const response = await rideRepository.getRidesByUserEmail(userEmail);

        //  Filtrando as corridas encontradas de acordo com o status
        const pendentes = response.filter(ride => ride.status === 'pendente');
        const iniciadas = response.filter(ride => ride.status === 'iniciada');
        const finalizadas = response.filter(ride => ride.status === 'finalizada');

        return {
            statusCode: 200,
            data: {
                pendentes: pendentes,
                iniciadas: iniciadas,
                finalizadas: finalizadas
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro ao buscar corridas do usuário',
                error: error.message
            }
        }
    }
}

const startRide = async (rideId) => {

    //  Verifica se a corrida existe de acordo com o id
    try {
        const rideResponse = await rideRepository.getRideById(rideId);
        if (!rideResponse) {
            return {
                statusCode: 404,
                data: { message: 'Corrida não encontrada' }
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro ao buscar corrida',
                error: error.message
            }
        }
    }

    //  Atualiza o status da corrida
    try {
        const rideResponse = await rideRepository.startRide(rideId);
        return {
            statusCode: 200,
            data: rideResponse
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro ao iniciar corrida',
                error: error.message
            }
        }
    }
}

const endRide = async (rideId) => {

    //  Verifica se a corrida existe de acordo com o id
    try {
        const rideResponse = await rideRepository.getRideById(rideId);
        if (!rideResponse) {
            return {
                statusCode: 404,
                data: { message: 'Corrida não encontrada' }
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro ao buscar corrida',
                error: error.message
            }
        }
    }

    //  Atualiza o status da corrida
    try {
        const rideResponse = await rideRepository.endRide(rideId);
        return {
            statusCode: 200,
            data: rideResponse
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro ao finalizar corrida',
                error: error.message
            }
        }
    }
}

module.exports = {
    createRide,
    getRides,
    startRide,
    endRide,
    getRidesByUserEmail
}
