const formulasDB = require('../../../database/formulas.db.service');

const FORMULA_TYPE_READY_ID = 1

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
        const formulas = await formulasDB.getFormulasByType(FORMULA_TYPE_READY_ID);
        return res.status(200).json({
            data: { formulas: formulas },
            error: null
        });
    }
    catch(err){
        const message = '[formulas] ' + err;
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}