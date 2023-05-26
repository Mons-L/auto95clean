const reservationsDB = require('../../../database/reservations.db.service');

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
    try{
        const reservations = await reservationsDB.getReservations();
        return res.status(200).json({
            data: {reservations: reservations},
            error: null
        });
    }
    catch(err){
        const message = "[reservations] " + err
        console.error(message);
        return res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}

const handlePut = async(req, res) => {
    const state = req.body.state;
    const reservationDate = req.body.reservationDate;
    const userId = req.body.userId;
    const formulaId = req.body.formulaId;

    try{
        const result = await reservationsDB.insertReservation(state, reservationDate, userId, formulaId);

        if(!result){
            const message = "[reservations] Inserting reservation failed. Something went wrong inserting a reservation in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }
        return res.status(201).json({
            data: { message: "Inserting reservation succeed", insertedId: result },
            error: null
        });
    }
    catch(err){
        const message = "[reservations] " + err
        console.error(message);
        return res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}