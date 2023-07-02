import db from './db.service';

const SELECT_FORMULA_TASK = 'SELECT * FROM formula_task'
const SELECT_FORMULA_TASK_BY_FORMULA_ID = 'SELECT * FROM formula_task WHERE formulaId=?'
const SELECT_FORMULA_TASK_BY_TASK_ID = 'SELECT * FROM formula_task WHERE taskId=?'
const INSERT_FORMULA_TASK = 'INSERT INTO formula_task(formulaId, taskId) VALUES (?, ?)';
const DELETE_FORMULA_TASK = 'DELETE FROM formula_task WHERE formulaId=? AND taskId=?';
const SELECT_FORMULA_JOIN_TASK_BY_FORMULA_TYPE_ID = 'SELECT formulaId, taskId, f.label AS formulaLabel, t.label AS taskLabel, t.type AS taskType, t.price AS taskPrice FROM formula AS f INNER JOIN formula_task ON f.id=formula_task.formulaId INNER JOIN task AS t ON t.id=formula_task.taskId WHERE formulaTypeId=?'

module.exports = {
    async getFormulasTasks(){
        try {
            return await db.query(SELECT_FORMULA_TASK);
        }
        catch(err){
            const message = '[formulasTasks.db.service] Getting formulas_tasks went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getFormulasTasksByFormulaId(id){
        try{
            return await db.query(SELECT_FORMULA_TASK_BY_FORMULA_ID, [id]);
        }
        catch(err){
            const message = "[formulasTasks.db.service] Getting formulas tasks by formula id went bad. Reason: " + err;
            console.error(message);
            throw message;
        }
        finally{
            await db.end();
        }
    },

    async getFormulasTasksByTaskId(id){
        try{
            return await db.query(SELECT_FORMULA_TASK_BY_TASK_ID, [id]);
        }
        catch(err){
            const message = "[formulasTasks.db.service] Getting formulas tasks by task id went bad. Reason: " + err;
            console.error(message);
            throw message;
        }
        finally{
            await db.end();
        }
    },

    async getFormulasJoinTasksByFormulaTypeId(id){
        try{
            return await db.query(SELECT_FORMULA_JOIN_TASK_BY_FORMULA_TYPE_ID, [id]);
        }
        catch(err){
            const message = "[formulasTasks.db.service] Getting formulas joined tasks by formula type id went bad. Reason: " + err;
            console.error(message);
            throw message;
        }
        finally{
            await db.end();
        }
    },

    async insertFormulaTask(formulaId, taskId, transaction){
        let queryMethod = transaction? await db.queryTransaction : await db.query
        try{
            let result = await queryMethod(INSERT_FORMULA_TASK, [formulaId, taskId], transaction);

            if(transaction)
                return result
            else {
                if (result.affectedRows !== 1) {
                    console.error("Insert formula task went bad. The expected number of affected rows is wrong."
                        + " Expected: 1, affected rows: " + result.affectedRows);
                    return false;
                }
                return result.insertId;
            }
        }
        catch(err){
            const message = "[tasks.db.service] Inserting task with values: { formulaId: "
                + formulaId + ", taskId: " + taskId + " } went bad. Reason: " + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }

    /*async updateTask(label, price, id){
        try{
            const result = await db.query(UPDATE_TASK, [label, price, id]);

            if(result.affectedRows !== 1){
                console.error("Update task went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = "[tasks.db.service] Updating task with values: { id: " + id
                + ", label: " + label + ", price: " + price + " } went bad. Reason: " + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async deleteTask(id){
        try{
            const result =  await db.query(DELETE_TASK, [id]);

            if(result.affectedRows !== 1){
                console.error("Delete task went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = "[tasks.db.service] Deleting task with value: { id: " + id
                + " } went bad. Reason: " + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }*/
    }