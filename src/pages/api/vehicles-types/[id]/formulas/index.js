import formulasDB from "../../../../../database/formulas.db.service";

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'GET': return handleGet(req, res);
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

        const formulasPrices = await formulasDB.getFormulasPricesByVehicleTypeId(id);
        return res.status(200).json({
            data: { formulasPrices: formulasPrices },
            error: null
        });
    }
    catch(err){
        const message = '[vehiclesTypes/id/formulas] ' + err;
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}