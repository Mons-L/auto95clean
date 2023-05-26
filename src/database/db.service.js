
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
        const results = await dbService.query(query, values);
        await dbService.end();
        return results;
    }
    catch(err){
        throw err;
    }
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
    end
}