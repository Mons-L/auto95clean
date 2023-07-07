import db from "./db.service";

const SELECT_USER_BY_EMAIL = 'SELECT * FROM users WHERE email=?';
const SELECT_USER_BY_ID = 'SELECT * FROM users WHERE id=?';
const INSERT_USER = 'INSERT INTO users(firstname, lastname, email, password, phone, role, addressId) VALUES(?, ?, ?, ?, ?, ?, ?)';

module.exports = {
    async getUserByEmail(email){
        try{
            const result =  await db.query(SELECT_USER_BY_EMAIL, [email]);
            if(result.length !== 1)
                return null;
            return result[0];
        }
        catch(err){
            const message = "[users.db.service] Getting user went bad. Reason: " + err;
            console.error(message);
            throw message;
        }
        finally{
            await db.end();
        }
    },

    async getUserById(id){
        try{
            const result =  await db.query(SELECT_USER_BY_ID, [id]);
            if(result.length !== 1)
                return null;
            return result[0];
        }
        catch(err){
            const message = "[users.db.service] Getting user went bad. Reason: " + err;
            console.error(message);
            throw message;
        }
        finally{
            await db.end();
        }
    },

    async insertUser(firstname, lastname, email, password, phone=null, role, addressId=null){
        try{
            let result = await db.query(INSERT_USER, [firstname, lastname, email, password, phone, role, addressId]);

            if (result.affectedRows !== 1) {
                console.error("Insert user went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return result.insertId;
        }
        catch(err){
            const message = "[tasks.db.service] Inserting user went bad. Reason: " + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }
}