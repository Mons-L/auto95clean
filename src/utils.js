module.exports = {
    respectOpeningHours(startTime, endTime, openingTime, closingTime){
        return startTime >= openingTime
            && startTime < closingTime
            && endTime >= openingTime
            && endTime <= closingTime
    }
}