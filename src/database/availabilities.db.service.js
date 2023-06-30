const db = require("./db.service");
const SELECT_HOLIDAYS_BETWEEN_DATES = 'SELECT * FROM holidays WHERE ? BETWEEN start_date AND end_date OR ? BETWEEN start_date AND end_date'
const SELECT_OPENING_HOURS_BY_WEEK_DAY = 'SELECT * FROM opening_hours WHERE WEEKDAY(?)=week_day'


module.exports = {
    async getHolidaysBetweenDates(startDate, endDate){
        try {
            return await db.query(SELECT_HOLIDAYS_BETWEEN_DATES, [startDate, endDate]);
        }
        catch(err){
            const message = '[availabilities.db.service] Getting holidays with values { startDate: '
                + startDate + ', endDate: ' + endDate + ' } went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    },

    async getOpeningHoursByWeekDay(date){
        try {
            const result = await db.query(SELECT_OPENING_HOURS_BY_WEEK_DAY, [date]);
            if(result.length !== 1)
                return null;
            return result[0];
        }
        catch(err){
            const message = '[availabilities.db.service] Getting opening hours with value { date: '
                + date + ' } went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }
}