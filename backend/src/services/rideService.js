const rideRepository = require('../repositories/rideRepository');

const createRide = async (ride) => {

    if (!ride) {
        return {
            statusCode: 400,
            data: { message: 'Dados da corrida não preenchidos' }
        }
    }

    try {
        //  Verifica se a corrida já existe
        try {
            const rideExists = await rideRepository.getRideEmAndamento(ride.user);
            if (rideExists) {
                return {
                    statusCode: 409,
                    data: { message: 'Usuário já possui uma corrida em andamento' }
                }
            }
        }
        catch (error) {
            return {
                statusCode: 500,
                data: {
                    message: 'Erro ao verificar se o usuário já possui uma corrida em andamento',
                    error: error.message
                }
            }
        }

        //  Se não existir, cria a corrida
        const response = await rideRepository.createRide(ride);
        return {
            statusCode: 201,
            data: response
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

module.exports = {
    createRide,
    getRides
}
