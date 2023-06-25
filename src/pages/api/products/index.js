const productsDB = require('../../../database/products.db.service');

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
    try {
        let products = null
        let filters = {}

        if(req.query.categories) {
            const categories = req.query.categories.split(",")
            filters = {...filters, categories: categories}
        }

        if(req.query.sort) {
            const sort = req.query.sort
            filters = {...filters, sort: sort}
        }

        if(req.query.search)
            products = await productsDB.getProductsBySearch(req.query.search);
        else if(Object.keys(filters).length > 0)
            products = await productsDB.getProductsByFilters(filters);
        else
            products = await productsDB.getProducts();

        return res.status(200).json({
            data: { products: products },
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

const handlePut = async (req, res) => {
    const label = req.body.label;
    const description = req.body.description;
    const image_path = req.body.image_path;
    const price = req.body.price;
    const quantity = req.body.quantity;

    try{
        const result = await productsDB.insertProduct(label, description, image_path, price, quantity);

        if(!result){
            const message = "[products] Inserting product failed. Something went wrong inserting a product in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }
        return res.status(201).json({
            data: { message: "Inserting product succeed", insertedId: result },
            error: null
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