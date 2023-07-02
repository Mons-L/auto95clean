import availabilitiesDB from "../../../database/availabilities.db.service";
import reservationsDB from "../../../database/reservations.db.service";
import {addDays, timeToMinutes} from "../../../utils";

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'GET': return handleGet(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).json({
                data: null,
                error: { message: 'Method ' + method + ' not allowed' }
            });
    }
}

const handleGet = async (req, res) => {
    const {fromDate, dayNumber, slotDuration} = req.query
    try{
        const calendarAvailabilities = await availabilitiesDB.getCalendarAvailabilitiesByInterval(fromDate, dayNumber);

        const reservations = await reservationsDB.getResevationsBetweenDates(fromDate, addDays(new Date(fromDate), 6))

        function getAvailableSlots(reservations, calendarAvailabilities) {
            let test = []

            test = calendarAvailabilities.map(availability => {
                const availabilityDate = new Date(availability.date);
                let availableSlots = [];

                const morningStartTime = new Date(`${availability.date}T${availability.morning_start_time}`);
                const morningEndTime = new Date(`${availability.date}T${availability.morning_end_time}`);
                const eveningStartTime = new Date(`${availability.date}T${availability.evening_start_time}`);
                const eveningEndTime = new Date(`${availability.date}T${availability.evening_end_time}`);

                // Vérifier les créneaux matin et soir
                checkAvailabilitySlot(morningStartTime, morningEndTime, 120, availableSlots);
                checkAvailabilitySlot(eveningStartTime, eveningEndTime, 120, availableSlots);
                return {date: availabilityDate, availableSlots: availableSlots}

            })
            return test
        }

        function checkAvailabilitySlot(startTime, endTime, slotDuration, availableSlots) {
            slotDuration = slotDuration * 60 * 1000; // Convert slotDuration from minutes to millisecondes

            while (startTime.getTime() + slotDuration <= endTime.getTime()) {
                const slotEndTime = new Date(startTime.getTime() + slotDuration);
                const overlappingSlot = availableSlots.find(slot => {
                    return (
                        (slot.startTime <= startTime && slot.endTime > startTime) ||
                        (slot.startTime < slotEndTime && slot.endTime >= slotEndTime) ||
                        (slot.startTime >= startTime && slot.endTime <= slotEndTime)
                    );
                });

                // Vérifier si la date de disponibilité correspond à une réservation existante
                const overlappingReservation = reservations.find(reservation => {
                    return (
                        (new Date(reservation.start_date).getTime() <= startTime && new Date(reservation.end_date).getTime() > startTime) ||
                        (new Date(reservation.start_date).getTime() < slotEndTime && new Date(reservation.end_date).getTime() >= slotEndTime) ||
                        (new Date(reservation.start_date).getTime() >= startTime && new Date(reservation.end_date).getTime() <= slotEndTime)
                    );
                });

                if (!overlappingSlot && !overlappingReservation) {
                    availableSlots.push({
                        startTime: new Date(startTime),
                        endTime: new Date(slotEndTime),
                    });
                }

                startTime = new Date(startTime.getTime() + slotDuration);
            }
        }

        const availableSlots = getAvailableSlots(reservations, calendarAvailabilities);

        return res.status(200).json({
            data: {calendarAvailabilities: availableSlots},
            error: null
        });
    }
    catch(err){
        const message = "[availabilities] " + err
        console.error(message);
        return res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}