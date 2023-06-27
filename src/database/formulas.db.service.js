import db from './db.service';

const SELECT_FORMULA = 'SELECT * FROM formula';
const SELECT_FORMULA_BY_TYPE_ID = 'SELECT * FROM formula WHERE formula_type_id=?';
const SELECT_FORMULA_BY_ID = 'SELECT * FROM formula WHERE id=?';
const INSERT_FORMULA = 'INSERT INTO formula(label, description, formula_type_id) VALUES (?, ?, ?)';
const UPDATE_FORMULA = 'UPDATE formula SET label=?, description=?, formula_type_id=? WHERE id=?';
const DELETE_FORMULA = 'DELETE FROM formula WHERE id=?';

module.exports = {
    async getFormulas(){
        try {
            return await db.query(SELECT_FORMULA);
        }
        catch(err){
            const message = '[formulas.db.service] Getting formulas went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getFormulasByType(typeId){
        try {
            return await db.query(SELECT_FORMULA_BY_TYPE_ID, [typeId]);
        }
        catch(err){
            const message = '[formulas.db.service] Getting formulas went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getFormulaById(id){
        try {
            const result = await db.query(SELECT_FORMULA_BY_ID, [id]);
            if(result.length !== 1)
                return null;
            return result[0];
        }
        catch(err){
            const message = '[formulas.db.service] Getting formula with id went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async insertFormula(label, description, formulaTypeId, transaction){
        let queryMethod = transaction? await db.queryTransaction : db.query
        try{
            let result = await queryMethod(INSERT_FORMULA, [label, description, formulaTypeId], transaction);

            if(transaction)
                return result
            else{
                if(result.affectedRows !== 1){
                    console.error("Insert formula went bad. The expected number of affected rows is wrong."
                        + " Expected: 1, affected rows: " + result.affectedRows);
                    return false;
                }
                return result.insertId;
            }
        }
        catch(err){
            const message = '[formulas.db.service] Inserting formula with values { label: '
                + label + ', description: ' + description + ', formulaTypeId: ' + formulaTypeId + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async updateFormula(label, description, formulaTypeId, id, transaction){
        try {
            const result = await db.query(UPDATE_FORMULA, [label, description, formulaTypeId, id]);

            if(result.affectedRows !== 1){
                console.error("Update formula went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = '[formulas.db.service] Updating formula type with values { label: '
                + label + ', description: ' + description + ', formulaTypeId: ' + formulaTypeId
                + ', id: ' + id + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async deleteFormula(id, transaction){
        try {
            const result = await db.query(DELETE_FORMULA, [id]);

            if(result.affectedRows !== 1){
                console.error("Delete formula went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = '[formulas.db.service] Deleting formula with value { id: '
                + id + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }
}