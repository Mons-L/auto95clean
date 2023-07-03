const reservationsDB = require('../../../../../database/reservations.db.service');
const tasksDB = require('../../../../../database/tasks.db.service');

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
    const userId = 1
    try {
        let reservations = await reservationsDB.getResevationJoinFormulaJoinVehicleTypeByUserId(userId);

        reservations = await Promise.all(reservations.map(async reservation => {
            return {...reservation, tasks: await tasksDB.getTasksByFormulaId(reservation.formulaId)}
        }))
        return res.status(200).json({
            data: { reservations: reservations },
            error: null
        });
    }
    catch(err){
        const message = '[reservations] ' + err;
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}