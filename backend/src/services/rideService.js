const rideRepository = require('../repositories/rideRepository');
const userRepository = require('../repositories/userRepository');
const vehicleRepository = require('../repositories/vehicleRepository');

const createRide = async (ride) => {

    //  Verifica se os dados da corrida foram preenchidos
    if (!ride.user.telephone || !ride.vehicle.licensePlate || !ride.startPlace || !ride.finishPlace) {
        return {
            statusCode: 400,
            data: { message: 'Dados da corrida ausentes. Verifique se todos os campos foram preenchidos.' }
        }
    }

    const { user, vehicle } = ride;

    //  Verifica se o usuário existe de acordo com o telefone
    try {
        const userResponse = await userRepository.getUserByPhone(user.telephone);
        if (!userResponse) {
            return {
                statusCode: 404,
                data: { message: 'Usuário não encontrado.' }
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro ao buscar usuário.',
                error: error.message
            }
        }
    }

    //  Verifica se o veículo existe de acordo com a placa
    try {
        const vehicleResponse = await vehicleRepository.getVehicleByLicensePlate(vehicle.licensePlate);
        if (!vehicleResponse) {
            return {
                statusCode: 404,
                data: { message: 'Veículo não encontrado.' }
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

const getRidesByPhone = async (userPhone, page) => {

    try {
        const response = await rideRepository.getRidesByPhone(userPhone, page);

        if (!response) {
            return {
                statusCode: 204,
                data: { message: 'Nenhuma corrida encontrada para o usuário.' }
            }
        }

        return {
            statusCode: 200,
            data: response
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

const updateRide = async (rideId, newStatus) => {

    //  Verifica se as informações da corrida foram preenchidas
    if (!rideId || !newStatus) {
        return {
            statusCode: 400,
            data: { message: 'Dados da corrida não preenchidos' }
        }
    }

    //  Verifica se a corrida existe de acordo com o id
    let ride;
    try {
        ride = await rideRepository.getRideById(rideId);
        if (!ride) {
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

    //  Verifica o status atual da corrida e executa a ação de acordo com o status
    switch (newStatus) {
        case 'iniciada':
            //  Verifica se a corrida já foi iniciada
            if (ride.status === 'iniciada') {
                return {
                    statusCode: 400,
                    data: { message: 'Corrida já iniciada' }
                }
            }

            //  Verifica se a corrida já foi finalizada
            else if (ride.status === 'finalizada') {
                return {
                    statusCode: 400,
                    data: { message: 'Corrida já finalizada, não é possível alterar' }
                }
            }
            
            //  Inicia a corrida
            try {
                const response = await rideRepository.startRide(rideId);
                return {
                    statusCode: 200,
                    data: response
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

        case 'finalizada':
            //  Verifica se a corrida já foi finalizada
            if (ride.status === 'finalizada') {
                return {
                    statusCode: 400,
                    data: { message: 'Corrida já finalizada, não é possível alterar' }
                }
            }

            //  Verifica se a corrida ainda não foi iniciada
            else if (ride.status === 'pendente') {
                return {
                    statusCode: 400,
                    data: { message: 'Corrida ainda não iniciada' }
                }
            }

            //  Finaliza a corrida
            try {
                const response = await rideRepository.endRide(rideId);
                return {
                    statusCode: 200,
                    data: response
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

        default:
            return {
                statusCode: 400,
                data: { message: 'Status da corrida inválido' }
            }
    }
}

module.exports = {
    createRide,
    getRides,
    getRidesByPhone,
    updateRide
}
