const productCategoriesDB = require('../../../database/productCategories.db.service');

import {
    createRouter
} from "next-connect";

const router = createRouter()

router
    .get(async (req, res) => {
        try{
            const productCategories = await productCategoriesDB.getProductCategories();
            return res.status(200).json({
                data: {productCategories: productCategories},
                error: null
            });
        }
        catch(err){
            const message = "[productCategories] " + err
            console.error(message);
            return res.status(500).json({
                data: null,
                error: { message: message }
            });
        }
    })
    .put(async (req, res) => {
        const { label } = req.body
        try{
            const productCategories = await productCategoriesDB.insertProductCategory(label);
            return res.status(200).json({
                data: {productCategories: productCategories},
                error: null
            });
        }
        catch(err){
            const message = "[productCategories] " + err
            console.error(message);
            return res.status(500).json({
                data: null,
                error: { message: message }
            });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.body
        try{
            const productCategories = await productCategoriesDB.deleteProductCategory(id);
            return res.status(200).json({
                data: {productCategories: productCategories},
                error: null
            });
        }
        catch(err){
            const message = "[productCategories] " + err
            console.error(message);
            return res.status(500).json({
                data: null,
                error: { message: message }
            });
        }
    })

const handlePut = async(req, res) => {
    const {label} = req.body;

    try{
        const result = await productCategoriesDB.insertProductCategory(label);

        if(!result){
            const message = "[tasks] Inserting product category failed. Something went wrong inserting a task in database";
            console.error(message);
            return res.status(424).json({
                data: null,
                error: { message: message }
            });
        }
        return res.status(201).json({
            data: { message: "Inserting product category succeed", insertedId: result },
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

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});