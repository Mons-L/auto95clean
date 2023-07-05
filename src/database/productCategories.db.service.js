import db from './db.service';

const SELECT_PRODUCT_CATEGORIES = 'SELECT * FROM product_category';
const SELECT_PRODUCT_CATEGORY_BY_ID = 'SELECT * FROM product_category WHERE id=?'
const SELECT_PRODUCT_CATEGORY_BY_LABEL = 'SELECT * FROM product_category WHERE label=?'
const INSERT_PRODUCT_CATEGORY = 'INSERT INTO product_category(label,) VALUES(?)';
const UPDATE_PRODUCT_CATEGORY = 'UPDATE product_category SET label=? WHERE id=?';
const DELETE_PRODUCT_CATEGORY = 'DELETE FROM product_category WHERE id=?';

module.exports = {
    async getProductCategories(){
        try {
            return await db.query(SELECT_PRODUCT_CATEGORIES);
        }
        catch(err){
            const message = '[productCategories.db.service] Getting product categories went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getProductCategoryById(id){
        try{
            const result =  await db.query(SELECT_PRODUCT_CATEGORY_BY_ID, [id]);
            if(result.length !== 1)
                return null;
            return result[0];
        }
        catch(err){
            const message = '[productCategories.db.service] Getting product category went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getProductCategoryByLabel(label){
        try{
            const result =  await db.query(SELECT_PRODUCT_CATEGORY_BY_LABEL, [id]);
            if(result.length !== 1)
                return null;
            return result[0];
        }
        catch(err){
            const message = '[productCategories.db.service] Getting product category went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async insertProductCategory(label){
        try{
            const result = await db.query(INSERT_PRODUCT_CATEGORY, [label]);

            if(result.affectedRows !== 1){
                console.error("Insert product category went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return result.insertId;
        }
        catch(err){
            const message = '[productCategories.db.service] Inserting product category with values { label: ' + label + ' } went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async updateProductCategory(label){
        try {
            const result = await db.query(UPDATE_PRODUCT_CATEGORY, [label, id]);

            if(result.affectedRows !== 1){
                console.error("Update product category went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = '[productCategories.db.service] Updating product with values { label: ' + label + ' } went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async deleteProductCategory(id){
        try {
            const result = await db.query(DELETE_PRODUCT_CATEGORY, [id]);

            if(result.affectedRows !== 1){
                console.error("Delete product went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = '[productCategories.db.service] Deleting product category with value { id: ' + id + ' } went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }
}