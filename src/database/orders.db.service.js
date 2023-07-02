import db from './db.service';

const SELECT_ORDERS = 'SELECT * FROM orders';
const SELECT_ORDERS_BY_USER_ID = 'SELECT * FROM orders WHERE user_id=?';
const SELECT_ORDERS_JOIN_PRODUCT_BY_USER_ID = 'SELECT * FROM orders ord INNER JOIN orders_product op on ord.id = op.order_id INNER JOIN product p on op.product_id = p.id WHERE user_id=?';
const SELECT_ORDERS_JOIN_ADRESSES_BY_ORDER_ID = 'SELECT * FROM orders ord INNER JOIN orders_address oa on ord.id = oa.order_id INNER JOIN address a on oa.address_id = a.id WHERE order_id=?';


module.exports = {
    async getOrders(){
        try {
            return await db.query(SELECT_ORDERS);
        }
        catch(err){
            const message = '[orders.db.service] Getting orders went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getOrdersByUserId(userId){
        try {
            return await db.query(SELECT_ORDERS_BY_USER_ID, [userId]);
        }
        catch(err){
            const message = '[orders.db.service] Getting orders by user id went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getOrdersJoinProductsByUserId(userId){
        try {
            return await db.query(SELECT_ORDERS_JOIN_PRODUCT_BY_USER_ID, [userId]);
        }
        catch(err){
            const message = '[orders.db.service] Getting orders join products by user id went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getOrderJoinAddressesByOrderId(orderId){
        try {
            return await db.query(SELECT_ORDERS_JOIN_ADRESSES_BY_ORDER_ID, [orderId]);
        }
        catch(err){
            const message = '[orders.db.service] Getting order join addresses by order id went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }

}