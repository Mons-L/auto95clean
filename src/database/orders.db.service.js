import db from './db.service';

const SELECT_ORDERS = 'SELECT * FROM orders';
const SELECT_ORDERS_BY_USER_ID = 'SELECT * FROM orders WHERE userId=?';
const SELECT_ORDERS_JOIN_PRODUCT_BY_USER_ID = 'SELECT o.id AS orderId, o.orderDate, o.deliveryType, o.deliveryCharges, o.paymentMode, o.state, p.id AS productId, p.label, p.imagePath, p.price, op.quantity FROM orders o INNER JOIN orders_product op on o.id = op.orderId INNER JOIN product p on p.id = op.productId WHERE userId=?';
const SELECT_ORDERS_JOIN_ADRESSES_JOIN_CITY_BY_ORDER_ID = 'SELECT a.id, a.fullname, a.number, a.label, a.phone, oa.type, c.label city, c.postalCode FROM orders o INNER JOIN orders_address oa on o.id = oa.orderId INNER JOIN address a on a.id = oa.addressId INNER JOIN city c ON c.id=a.cityId WHERE orderId=?';
const INSERT_ORDERS_PRODUCT = 'INSERT INTO orders_product(orderId, productId, quantity) VALUES(?, ?, ?)';
const INSERT_ORDERS = 'INSERT INTO orders(orderDate, deliveryType, deliveryCharges, paymentMode, state, userId) VALUES(NOW(), ?, ?, ?, ?, ?)';

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
            return await db.query(SELECT_ORDERS_JOIN_ADRESSES_JOIN_CITY_BY_ORDER_ID, [orderId]);
        }
        catch(err){
            const message = '[orders.db.service] Getting order join addresses by order id went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async insertOrderProduct(orderId, productId, quantity){
        try{
            let result = await db.query(INSERT_ORDERS_PRODUCT, [orderId, productId, quantity]);

            if (result.affectedRows !== 1) {
                console.error("Insert order product went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return result.insertId;
        }
        catch(err){
            const message = "[orders.db.service] Inserting order product with values: { orderId: "
                + orderId + ", productId: " + productId + ", quantity: " + quantity + " } went bad. Reason: " + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async insertOrder(deliveryType=null, deliveryCharges=null, paymentMode=null, state, userId=null){
        try{
            let result = await db.query(INSERT_ORDERS, [deliveryType, deliveryCharges, paymentMode, state, userId]);

            if (result.affectedRows !== 1) {
                console.error("Insert  went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return result.insertId;
        }
        catch(err){
            const message = "[orders.db.service] Inserting order went bad. Reason: " + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }

}