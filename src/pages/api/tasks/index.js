const tasksDB = require('../../../database/tasks.db.service');

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

const handleGet = async(req, res) => {
    try{
        const tasks = await tasksDB.getTasks();
        return res.status(200).json({
            data: {tasks: tasks},
            error: null
        });
    }
    catch(err){
        const message = "[tasks] " + err
        console.error(message);
        return res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}

const handlePut = async(req, res) => {
    const {label, type, price } = req.body;

    try{
        const result = await tasksDB.insertTask(label, type, price);

        if(!result){
            const message = "[tasks] Inserting task failed. Something went wrong inserting a task in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }
        return res.status(201).json({
            data: { message: "Inserting task succeed", insertedId: result },
            error: null
        });
    }
    catch(err){
        const message = "[tasks] " + err
        console.error(message);
        return res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}