import db from './db.service';

const INITIAL_MESSAGE_STATE = "En cours"
const INSERT_MESSAGE = 'INSERT INTO message(firstname, lastname, email, subject, content, messageDate, state) VALUES (?, ?, ?, ?, ?, NOW(), ?)';

module.exports = {
    async insertMessage(firstname, lastname, email, subject, content){
        try{
            const result = await db.query(INSERT_MESSAGE, [firstname, lastname, email, subject, content, INITIAL_MESSAGE_STATE]);

            if(result.affectedRows !== 1){
                console.error("Insert message went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }""
            return result.insertId;
        }
        catch(err){
            const message = '[messages.db.service] Inserting message with values { '
                + 'firstname: ' + firstname
                + ', lastname: ' + lastname
                + ', email: ' + email
                + ', subject: ' + subject
                + ', content: ' + content
                +' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }
}