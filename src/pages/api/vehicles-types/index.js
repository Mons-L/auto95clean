const vehiclesTypesDB = require('../../../database/vehiclesTypes.db.service');

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'GET': return handleGet(req, res);
        case 'PUT': return handlePut(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).json({
                data: null,
                error: { message: 'Method ' + method + ' not allowed' }
            });
    }
}


const handleGet = async (req, res) => {
    try {
        const vehiclesTypes = await vehiclesTypesDB.getVehiclesTypes();
        return res.status(200).json({
            data: { vehiclesTypes: vehiclesTypes },
            error: null
        });
    }
    catch(err){
        const message = '[vehiclesTypes] ' + err;
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}

const handlePut = async (req, res) => {
    const label = req.body.label;
    const description = req.body.description;

    try{
        const result = await vehiclesTypesDB.insertVehcileType(label, description);

        if(!result){
            const message = "[vehiclesTypes] Inserting vehicle type failed. Something went wrong inserting a vehicle type in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }
        return res.status(201).json({
            data: { message: "Inserting vehicle type succeed", insertedId: result },
            error: null
        });
    }
    catch(err){
        const message = "[vehiclesTypes] " + err;
        console.error(message);
        return res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}