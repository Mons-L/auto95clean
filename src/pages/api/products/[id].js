const productsDB = require('../../../database/products.db.service');

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

        const product = await productsDB.getProductById(id);
        if(!product)
            return res.status(400).json({
                data: null,
                error: { message: 'There is no product with the provided id. {id: ' + id + '}' }
            });
        return res.status(200).json({
            data: { product: product },
            error: null
        });
    }
    catch(err){
        const message = '[products] ' + err;
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}

const handlePost = async (req, res) => {
    const id = req.query.id;
    if(!id)
        return res.status(400).json({
            data: null,
            error: { message: 'The id is missing in the url or does not respect the format' }
        });

    const { label, description, imagePath, price, quantity, categoryId } = req.body;

    try{
        const result = await productsDB.updateProduct(label, description, imagePath, price, quantity, categoryId, id);

        if(!result){
            const message = "[products] Updating product failed. Something went wrong updating a product in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }
        return res.status(200).json({
            data: null,
            error: { message: 'Updating product with the provided id succeed. {id: ' + id + '}' }
        });
    }
    catch(err){
        const message = "[products] " + err;
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
        const result = await productsDB.deleteProduct(id);

        if(!result){
            const message = "[products] Deleting product failed. Something went wrong deleting a product in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }

        return res.status(200).json({
            data: null,
            error: { message: 'Deleting producy with the provided id succeed. {id: ' + id + '}' }
        });
    }
    catch(err){
        const message = "[products] " + err;
        console.error(message);
        return res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}