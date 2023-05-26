import db from './db.service';

const SELECT_VEHICLE_TYPE = 'SELECT * FROM vehicle_type';
const SELECT_VEHICLE_TYPE_BY_ID = 'SELECT * FROM vehicle_type WHERE id=?';
const INSERT_VEHICLE_TYPE = 'INSERT INTO vehicle_type(label, description) VALUES (?, ?)';
const UPDATE_VEHICLE_TYPE = 'UPDATE vehicle_type SET label=?, description=? WHERE id=?';
const DELETE_VEHICLE_TYPE = 'DELETE FROM vehicle_type WHERE id=?';

module.exports = {
    async getVehiclesTypes(){
        try {
            return await db.query(SELECT_VEHICLE_TYPE);
        }
        catch(err){
            const message = '[vehiclesTypes.db.service] Getting vehicles types went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getVehicleTypeById(id){
        try {
            const result = await db.query(SELECT_VEHICLE_TYPE_BY_ID, [id]);
            if(result.length !== 1)
                return null;
            return result[0];
        }
        catch(err){
            const message = '[vehiclesTypes.db.service] Getting vehicle type went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async insertVehcileType(label, description){
        try{
            const result = await db.query(INSERT_VEHICLE_TYPE, [label, description]);

            if(result.affectedRows !== 1){
                console.error("Insert vehicle_type went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return result.insertId;
        }
        catch(err){
            const message = '[vehiclesTypes.db.service] Inserting vehicle type with values { label: '
                + label + ', description: ' + description + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async updateVehicleType(label, description, id){
        try {
            const result = await db.query(UPDATE_VEHICLE_TYPE, [label, description, id]);

            if(result.affectedRows !== 1){
                console.error("Update vehicle_type went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = '[vehiclesTypes.db.service] Updating vehicle type with values { label: '
                + label + ', description: ' + description + ', id: ' + id + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async deleteVehicleType(id){
        try {
            const result = await db.query(DELETE_VEHICLE_TYPE, [id]);

            if(result.affectedRows !== 1){
                console.error("Delete vehicle type went bad. The expected number of affected rows is wrong."
                    + " Expected: 1, affected rows: " + result.affectedRows);
                return false;
            }
            return true;
        }
        catch(err){
            const message = '[vehiclesTypes.db.service] Deleting vehicle type with value { id: '
                + id + ' } went bad. Reason: ' + err;

            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }
}