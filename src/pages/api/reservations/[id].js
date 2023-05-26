const reservationsDB = require('../../../database/reservations.db.service');

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

const handleGet = async(req, res) => {
    try{
        const id = req.query.id;
        if(!id || !valideId(id))
            return res.status(400).json({
                data: null,
                error: { message: 'The id is missing in the url or does not respect the format' }
            });

        const reservation = await reservationsDB.getResevationById(id);
        if(!reservation)
            return res.status(400).json({
                data: null,
                error: { message: 'There is no reservation with the provided id. {id: ' + id + '}' }
            });
        return res.status(200).json({
            data: { reservation: reservation },
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

const handlePost = async(req, res) => {
    const id = req.query.id;
    if(!id || !valideId(id))
        return res.status(400).json({
            data: null,
            error: { message: 'The id is missing in the url or does not respect the format' }
        });

    const state = req.body.state;
    const reservationDate = req.body.reservationDate;
    const formulaId = req.body.formulaId;

    try{
        const result = await reservationsDB.updateReservation(state, reservationDate, formulaId, id);

        if(!result){
            const message = "[reservations] Updating reservation failed. Something went wrong updating a reservation in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }
        return res.status(200).json({
            data: null,
            error: { message: 'Updating reservation with the provided id succeed. {id: ' + id + '}' }
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

const handleDelete = async(req, res) => {
    const id = req.query.id;
    if(!id || !valideId(id))
        return res.status(400).json({
            data: null,
            error: { message: 'The id is missing in the url or does not respect the format' }
        });

    try{
        const result = await reservationsDB.deleteReservation(id);

        if(!result){
            const message = "[reservations] Deleting reservation failed. Something went wrong deleting a reservation in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }

        return res.status(200).json({
            data: null,
            error: { message: 'Deleting reservation with the provided id succeed. {id: ' + id + '}' }
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
