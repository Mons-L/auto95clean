import db from './db.service';

const SELECT_RESERVATION = 'SELECT * FROM reservation';
const SELECT_RESERVATION_BY_ID = 'SELECT * FROM reservation WHERE id=?';
const SELECT_RESERVATION_BETWEEN_DATES = 'SELECT * FROM reservation WHERE NOT ((startDate >= ? AND endDate > ?) OR (startDate < ? AND endDate <= ?))'
const INSERT_RESERVATION = 'INSERT INTO reservation(state, startDate, endDate, email, phone, immatriculation, userId, formulaId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
const UPDATE_RESERVATION = 'UPDATE reservation SET state=?, reservation_date=?, formulaId=? WHERE id=?';
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

    async getResevationsBetweenDates(startDate, endDate){
        try{
            return await db.query(SELECT_RESERVATION_BETWEEN_DATES, [endDate, endDate, startDate, startDate]);

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

    async insertReservation(state, startDate, endDate, email, phone, immatrculation, userId, formulaId, transaction){
        let queryMethod = transaction? await db.queryTransaction : await db.query

        try {
            let result = await queryMethod(INSERT_RESERVATION,
                [state, startDate, endDate, email, phone, immatrculation, userId, formulaId], transaction);

            if (transaction)
                return result
            else {
                if (result.affectedRows !== 1) {
                    console.error("Insert reservation went bad. The expected number of affected rows is wrong."
                        + " Expected: 1, affected rows: " + result.affectedRows);
                    return false;
                }
                return result.insertId;
            }
        }
        catch(err){
            const message = '[reservations.db.service] Inserting reservation with values { state: '
                + state + ', startDate: ' + startDate + ', endDate: ' + endDate
                +  ', email: ' + email +  ', phone: ' + phone +  ', immatriculation: ' + immatrculation
                + ', user_id: ' + userId + ', formula_id: ' + formulaId + ' } went bad. Reason: ' + err;

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