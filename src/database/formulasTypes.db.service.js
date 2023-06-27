import db from './db.service';

const SELECT_FORMULA_TYPE = 'SELECT * FROM formula_type';

module.exports = {
    async getFormulasTypes(){
        try {
            return await db.query(SELECT_FORMULA_TYPE);
        }
        catch(err){
            const message = '[formulasTypes.db.service] Getting formulas types went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },
}