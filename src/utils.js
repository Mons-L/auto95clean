
module.exports = {
    respectOpeningHours(startTime, endTime, openingTime, closingTime){
        return startTime >= openingTime
            && startTime < closingTime
            && endTime >= openingTime
            && endTime <= closingTime
    },

    addDays(date, days){
        date.setDate(date.getDate() + days);
        return date;
    },

    diffMinutes(date1, date2) {
        const d1 = new Date(date1).getTime();
        const d2 = new Date(date2).getTime();
        return Math.round((d2 - d1) / 60000); // Can use Math.floor or Math.ceil depends up to you
    },

    timeToMinutes(time){
        const values = time.split(':')
        const hours = parseInt(values[0])
        const minutes = parseInt(values[1])
        const seconds = parseInt(values[2])

        return hours*60 + minutes + seconds/60
    },

    handleInput(inputValue, stateHandler, trivialObject, inputName, state) {
        if(trivialObject)
            stateHandler(inputValue);
        else
            stateHandler({...state, [inputName]: inputValue})
    }
}