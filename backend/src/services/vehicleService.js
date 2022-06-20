const vehicleRepository = require('../repositories/vehicleRepository');

const createVehicle = async (vehicle) => {
    //  Tratamento de erros

    //  Verifica se o veículo está preenchido
    if (!vehicle) {
        return {
            statusCode: 400,
            data: { message: 'Dados do veículo não preenchidos' }
        }
    }

    try {
        //  Verifica se o veículo já existe
        try {
            const vehicleExists = await vehicleRepository.getVehicleByLicensePlate(vehicle.licensePlate);
            if (vehicleExists) {
                return {
                statusCode: 409,
                data: { message: 'Veículo já cadastrado' }
                }
            }
        }
        catch (error) {
            return {
                statusCode: 500,
                data: {
                    message: 'Erro ao verificar se o veículo já existe',
                    error: error.message
                }
            }
        }
        
        //  Se não existir, cria o veículo
        const response = await vehicleRepository.createVehicle(vehicle);
        return {
            statusCode: 201,
            data: response
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: { 
                message: 'Erro ao criar veículo',
                error: error.message
            }
        }
    }
}

const getVehicles = async () => {
    try {
        const response = await vehicleRepository.getVehicles();

        if (!response) {
            return {
                statusCode: 404,
                data: { message: 'Nenhum veículo cadastrado' }
            }
        }
        else {
            return {
                statusCode: 200,
                data: response
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            data: {
                message: 'Erro ao buscar veículos',
                error: error.message
            }
        }
    }
}

module.exports = {
    createVehicle,
    getVehicles
}
