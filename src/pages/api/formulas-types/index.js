const formulasTypesDB = require('../../../database/formulasTypes.db.service');

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'GET': return handleGet(req, res);
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
        const formulasTypes = await formulasTypesDB.getFormulasTypes();
        return res.status(200).json({
            data: { formulasTypes: formulasTypes },
            error: null
        });
    }
    catch(err){
        const message = '[formulasTypes] ' + err;
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}