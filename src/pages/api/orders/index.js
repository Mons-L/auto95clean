const ordersDB = require('../../../database/orders.db.service');

import {createRouter} from "next-connect";

const INITIAL_ORDER_STATE = "CART"
const router = createRouter()

router
    .put(async (req, res) => {
        const {deliveryType, deliveryCharges, paymentMode, userId, product} = req.body;
        const state= req.body.state || INITIAL_ORDER_STATE

        try{
            const result = await ordersDB.insertOrder(deliveryType, deliveryCharges, paymentMode, state, userId);

            if(!result){
                const message = "[orders] Inserting order failed. Something went wrong inserting an order in database";
                console.error(message);
                return res.status(424).json({
                    data: null,
                    error: { message: message }
                });
            }
            if(product !== null && product !== undefined && product.id !== null && product.id !== undefined)
                return res.redirect

            return res.status(201).json({
                data: { message: "Inserting order succeed", insertedId: result },
                error: null
            });
        }
        catch(err){
            const message = "[orders] " + err
            console.error(message);
            return res.status(500).json({
                data: null,
                error: { message: message }
            });
        }
    })

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});