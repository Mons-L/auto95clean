import vehiclesTypesDB from "../../../../database/vehiclesTypes.db.service";

const valideId = (id) => {
    return !isNaN(id);
}

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'GET': return handleGet(req, res);
        case 'POST': return handlePost(req, res);
        case 'DELETE': return handleDelete(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).json({
                data: null,
                error: { message: 'Method ' + method + ' not allowed' }
            });
    }
}

const handleGet = async (req, res) => {
    try {
        const id = req.query.id;
        if(!id || !valideId(id))
            return res.status(400).json({
                data: null,
                error: { message: 'The id is missing in the url or does not respect the format' }
            });

        const vehicleType = await vehiclesTypesDB.getVehicleTypeById();
        if(!vehicleType)
            return res.status(400).json({
                data: null,
                error: { message: 'There is no vehicle type with the provided id. {id: ' + id + '}' }
            });
        return res.status(200).json({
            data: { vehicleType: vehicleType },
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

const handlePost = async (req, res) => {
    const id = req.query.id;
    if(!id || !valideId(id))
        return res.status(400).json({
            data: null,
            error: { message: 'The id is missing in the url or does not respect the format' }
        });

    const label = req.body.label;
    const description = req.body.description;

    try{
        const result = await vehiclesTypesDB.updateVehicleType(label, description, id);

        if(!result){
            const message = "[vehiclesTypes] Updating vehicle type failed. Something went wrong updating a vehicle type in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }
        return res.status(200).json({
            data: null,
            error: { message: 'Updating vehicle type with the provided id succeed. {id: ' + id + '}' }
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

const handleDelete = async (req, res) => {
    const id = req.query.id;
    if(!id || !valideId(id))
        return res.status(400).json({
            data: null,
            error: { message: 'The id is missing in the url or does not respect the format' }
        });

    try{
        const result = await vehiclesTypesDB.deleteVehicleType(id);

        if(!result){
            const message = "[vehiclesTypes] Deleting vehicle type failed. Something went wrong deleting a vehicle type in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }

        return res.status(200).json({
            data: null,
            error: { message: 'Deleting vehicle type with the provided id succeed. {id: ' + id + '}' }
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