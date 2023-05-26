const tasksDB = require('../../../database/tasks.db.service');

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

        const task = await tasksDB.getTaskById(id);
        if(!task)
            return res.status(400).json({
                data: null,
                error: { message: 'There is no task with the provided id. {id: ' + id + '}' }
            });
        return res.status(200).json({
            data: { task: task },
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

const handlePost = async(req, res) => {
    const id = req.query.id;
    if(!id || !valideId(id))
        return res.status(400).json({
            data: null,
            error: { message: 'The id is missing in the url or does not respect the format' }
        });

    const label = req.body.label;
    const price = req.body.price;

    try{
        const result = await tasksDB.updateTask(label, price, id);

        if(!result){
            const message = "[tasks] Updating task failed. Something went wrong updating a task in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }
        return res.status(200).json({
            data: null,
            error: { message: 'Updating task with the provided id succeed. {id: ' + id + '}' }
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

const handleDelete = async(req, res) => {
    const id = req.query.id;
    if(!id || !valideId(id))
        return res.status(400).json({
            data: null,
            error: { message: 'The id is missing in the url or does not respect the format' }
        });

    try{
        const result = await tasksDB.deleteTask(id);

        if(!result){
            const message = "[tasks] Deleting task failed. Something went wrong deleting a task in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }

        return res.status(200).json({
            data: null,
            error: { message: 'Deleting task with the provided id succeed. {id: ' + id + '}' }
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
