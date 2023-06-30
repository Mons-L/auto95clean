import ServerlessMysql from "serverless-mysql";

let dbService = ServerlessMysql();
dbService.config({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

const query = async (query, values = []) => {
    try{
        return await dbService.query(query, values);
    }
    catch(err){
        throw err;
    }
}

const transaction = async () => {
    return dbService.transaction()
}

const queryTransaction = async (query, values, transaction) => {
    try{
        return await transaction.query(query, values);
    }
    catch(err){
        throw err;
    }
}

const commit = async (transaction) => {
    return transaction.commit()
}

const rollback = async (transaction, callback) => {
    return transaction.rollback(e => callback(e))
}

const end = async () => {
    try{
        return await dbService.end();
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    query,
    transaction,
    queryTransaction,
    commit,
    rollback,
    end
}