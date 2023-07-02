import db from './db.service';

const SELECT_PRODUCT = 'SELECT * FROM product';
const ORDER_BY_ASCENDING_PRICE = ' order by price';
const ORDER_BY_DESCENDING_PRICE = ' order by price DESC';
const SELECT_PRODUCT_BY_ID = 'SELECT * FROM product WHERE id=?'
const SELECT_PRODUCT_BY_SEARCH = 'SELECT * FROM product WHERE label LIKE ? OR description LIKE ?'
const FILTER_BY_CATEGORIES = ' WHERE category IN(?)'
const INSERT_PRODUCT = 'INSERT INTO product(label, description, imagePath, price, quantity) VALUES(?, ?, ?, ?, ?)';
const UPDATE_PRODUCT = 'UPDATE product SET label=?, description=?, imagePath=?, price=?, quantity=? WHERE id=?';
const DELETE_PRODUCT = 'DELETE FROM product WHERE id=?';

module.exports = {
    async getProducts(){
        try {
            return await db.query(SELECT_PRODUCT);
        }
        catch(err){
            const message = '[products.db.service] Getting products went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getProductById(id){
        try{
            const result =  await db.query(SELECT_PRODUCT_BY_ID, [id]);
            if(result.length !== 1)
                return null;
            return result[0];
        }
        catch(err){
            const message = '[products.db.service] Getting product went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getProductsByFilters(filters){
        try{
            let query = SELECT_PRODUCT
            let params = []

            if(filters.categories){
                query += FILTER_BY_CATEGORIES
                params.push(filters.categories)
            }

            if(filters.sort){
                switch (filters.sort){
                    case "ascendingPrice":
                        query += ORDER_BY_ASCENDING_PRICE
                        break
                    case "descendingPrice":
                        query += ORDER_BY_DESCENDING_PRICE
                        break
                }
            }

            return await db.query(query,params);
        }
        catch(err){
            const message = '[products.db.service] Getting products filtered went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getProductsBySearch(search){
        try {
            return await db.query(
                SELECT_PRODUCT_BY_SEARCH,
                ["%"+search.split(" ").join("%")+"%", "%"+search.split(" ").join("%")+"%"]
            );
        }
        catch(err){
            const message = '[products.db.service] Getting products filtered by search went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async insertProduct(label, description, image_path, price, quantity){
        try{
            const result = await db.query(INSERT_PRODUCT, [label, description, image_path, price, quantity]);

            if(result.affectedRows !== 1){
                console.error("Insert product went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return result.insertId;
        }
        catch(err){
            const message = '[products.db.service] Inserting product with values { label: '
                + label + ', description: ' + description + ', image_path: ' + image_path
                + ', price: ' + price + ', quantity: ' + quantity + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async updateProduct(label, description, image_path, price, quantity, id){
        try {
            const result = await db.query(UPDATE_PRODUCT, [label, description, image_path, price, quantity, id]);

            if(result.affectedRows !== 1){
                console.error("Update product went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = '[products.db.service] Updating product with values { label: '
                + label + ', description: ' + description + ', image_path: ' + image_path
                + ', price: ' + price + ', quantity: ' + quantity + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async deleteProduct(id){
        try {
            const result = await db.query(DELETE_PRODUCT, [id]);

            if(result.affectedRows !== 1){
                console.error("Delete product went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = '[products.db.service] Deleting product with value { id: '
                + id + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }
}