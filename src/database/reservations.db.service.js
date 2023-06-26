import db from './db.service';

const SELECT_RESERVATION = 'SELECT * FROM reservation';
const SELECT_RESERVATION_BY_ID = 'SELECT * FROM reservation WHERE id=?';
const INSERT_RESERVATION = 'INSERT INTO reservation(state, reservation_date, user_id, formula_id) VALUES(?, ?, ?, ?)';
const UPDATE_RESERVATION = 'UPDATE reservation SET state=?, reservation_date=?, formula_id=? WHERE id=?';
const DELETE_RESERVATION = 'DELETE FROM reservation WHERE id=?';

module.exports = {
    async getReservations(){
        try {
            return await db.query(SELECT_RESERVATION);
        }
        catch(err){
            const message = '[reservations.db.service] Getting reservations went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getResevationById(id){
        try{
            const result =  await db.query(SELECT_RESERVATION_BY_ID, [id]);
            if(result.length !== 1)
                return null;
            return result[0];
        }
        catch(err){
            const message = "[reservations.db.service] Getting reservation went bad. Reason: " + err;
            console.error(message);
            throw message;
        }
        finally{
            await db.end();
        }
    },

    async insertReservation(state, reservationDate, userId, formulaId){
        try{
            const result = await db.query(INSERT_RESERVATION, [state, reservationDate, userId, formulaId]);

            if(result.affectedRows !== 1){
                console.error("Insert reservation went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return result.insertId;
        }
        catch(err){
            const message = '[reservations.db.service] Inserting reservation with values { state: '
                + state + ', reservation_date: ' + reservationDate + ', user_id: ' + userId
                + ', formula_id: ' + formulaId + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async updateReservation(state, reservationDate, formulaId, id){
        try {
            const result = await db.query(UPDATE_RESERVATION, [state, reservationDate, formulaId, id]);

            if(result.affectedRows !== 1){
                console.error("Update reservation went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = '[reservations.db.service] Inserting reservation with values { state: '
                + state + ', reservation_date: ' + reservationDate + ', formula_id: ' + formulaId
                + ', id: ' + id + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async deleteReservation(id){
        try {
            const result = await db.query(DELETE_RESERVATION, [id]);

            if(result.affectedRows !== 1){
                console.error("Delete reservation went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = '[reservations.db.service] Deleting reservation with value { id: '
                + id + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }
}