const db = require("./db.service");
const SELECT_HOLIDAYS_BETWEEN_DATES = 'SELECT * FROM holidays WHERE ? BETWEEN start_date AND end_date OR ? BETWEEN start_date AND end_date'
const SELECT_OPENING_HOURS_BY_WEEK_DAY = 'SELECT * FROM opening_hours WHERE WEEKDAY(?)=week_day'
const SELECT_CALENDAR_AVAILABILITIES_BY_INTERVAL = 'SELECT * FROM (\n' +
    '    SELECT DATE_ADD(?, INTERVAL num DAY) AS date FROM(\n' +
    '        SELECT ROW_NUMBER() OVER (ORDER BY a.num + b.num * 10 + c.num * 100) - 1 AS num\n' +
    '        FROM (SELECT 0 AS num UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) AS a\n' +
    '             CROSS JOIN (SELECT 0 AS num UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) AS b\n' +
    '             CROSS JOIN (SELECT 0 AS num UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) AS c\n' +
    '        ) AS days\n' +
    '    WHERE num < ?\n' +
    ') AS date_range\n' +
    'CROSS JOIN opening_hours\n' +
    '    WHERE week_day = WEEKDAY(date)\n' +
    '    AND (morning_start_time IS NOT NULL OR evening_start_time IS NOT NULL)\n' +
    '    AND NOT EXISTS (\n' +
    '        SELECT 1\n' +
    '        FROM holidays\n' +
    '        WHERE date BETWEEN holidays.start_date AND holidays.end_date\n' +
    '    )'

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
    },

    async getCalendarAvailabilitiesByInterval(fromDate, dayNumber){
        try {
            return await db.query(SELECT_CALENDAR_AVAILABILITIES_BY_INTERVAL, [fromDate, dayNumber]);
        }
        catch(err){
            const message = '[availabilities.db.service] Getting calendar availabilities with values { fromDate: '
                + fromDate + ', dayNumber: ' + dayNumber + ' } went bad. Reason: ' + err;
            console.error(message);
            throw message;
        }
        finally {
            await db.end();
        }
    }
}