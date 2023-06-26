import db from "./db.service";

const SELECT_TASK = 'SELECT * FROM task';
const SELECT_TASK_BY_ID = 'SELECT * FROM task WHERE id=?';
const INSERT_TASK = 'INSERT INTO task(label, price) VALUES(?, ?)';
const UPDATE_TASK = 'UPDATE task SET label=?, price=? WHERE id=?';
const DELETE_TASK = "DELETE FROM task WHERE id=?";

module.exports = {
    async getTasks(){
        try{
            return await db.query(SELECT_TASK);
        }
        catch(err){
            const message = "[tasks.db.service] Getting tasks went bad. Reason: " + err;
            console.error(message);
            throw message;
        }
        finally{
            await db.end();
        }
    },

    async getTaskById(id){
        try{
            const result =  await db.query(SELECT_TASK_BY_ID, [id]);
            if(result.length !== 1)
                return null;
            return result[0];
        }
        catch(err){
            const message = "[tasks.db.service] Getting task went bad. Reason: " + err;
            console.error(message);
            throw message;
        }
        finally{
            await db.end();
        }
    },

    async insertTask(label, price){
        try{
            const result = await db.query(INSERT_TASK, [label, price]);

            if(result.affectedRows !== 1){
                console.error("Insert task went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return result.insertId;
        }
        catch(err){
            const message = "[tasks.db.service] Inserting task with values: { label: "
                + label + ", price: " + price + " } went bad. Reason: " + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async updateTask(label, price, id){
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
        }
    }
}