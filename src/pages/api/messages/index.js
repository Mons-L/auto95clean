const messagesDB = require('../../../database/messages.db.service');

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'PUT': return handlePut(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).json({
                data: null,
                error: { message: 'Method ' + method + ' not allowed' }
            });
    }
}

const handlePut = async (req, res) => {
    const { firstname, lastname, email, subject, content } = req.body;

    try{
        const result = await messagesDB.insertMessage(firstname, lastname, email, subject, content);

        if(!result){
            const message = "[messages] Inserting message failed. Something went wrong inserting a message in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }
        return res.status(201).json({
            data: { message: "Inserting message succeed", insertedId: result },
            error: null
        });
    }
    catch(err){
        const message = "[messages] " + err;
        console.error(message);
        return res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}