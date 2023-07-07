import {respectOpeningHours} from "../../../utils";
import {createRouter} from "next-connect";
import dbService from "../../../database/db.service";
import auth from "../../../middlewares/auth";
const reservationsDB = require('../../../database/reservations.db.service');
const availabilitiesDB = require('../../../database/availabilities.db.service');
const formulasDB = require('../../../database/formulas.db.service');
const formulasTasksDB = require('../../../database/formulasTasks.db.service');

const INITIAL_RESERVATION_STATE = "EN ATTENTE"
const MAX_RESERVATION_AT_SAME_TIME = 1
const CUSTOM_FORMULA_TYPE = "custom"
const CUSTOM_FORMULA_TYPE_ID = 2
const DEFAULT_FORMULA_LABEL = "DEFAULT LABEL"

const router = createRouter()

const isHolidaysConflicts = async (req, res) => {
    const { startDate, endDate } = req.body

    try {
        const holidays = await availabilitiesDB.getHolidaysBetweenDates(startDate, endDate)
        if (holidays.length > 0) {
            const message = "[reservations] Inserting reservation failed. The reservation dates conflicts with holidays";
            console.error(message);
            res.status(424).json({
                data: null,
                error: {message: message}
            });
            return true
        }
        return false
    }
    catch(err){
        const message = "[reservations] " + err
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
        return true
    }
}

const isOpeningHoursConflicts = async (req, res) => {
    const { startDate, endDate } = req.body

    try{
        const openingHours = await availabilitiesDB.getOpeningHoursByWeekDay(startDate)
        const startReservationTime = new Date(startDate).toLocaleTimeString()
        const endReservationTime = new Date(endDate).toLocaleTimeString()
        if(!respectOpeningHours(startReservationTime, endReservationTime,
                openingHours.morningStartTime, openingHours.morningEndTime)
            && !respectOpeningHours(startReservationTime, endReservationTime,
                openingHours.eveningStartTime, openingHours.eveningEndTime)
        ){
            const message = "[reservations] Inserting reservation failed. The reservation time conflicts with opening hours";
            console.error(message);
            res.status(424).json({
                data: null,
                error: { message: message }
            });
            return true
        }
        return false
    }
    catch(err){
        const message = "[reservations] " + err
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
        return true
    }
}

const isReservationsConflicts = async (req, res) => {
    const { startDate, endDate } = req.body
    try{
        const reservationsBetweenDates = await reservationsDB.getResevationsBetweenDates(startDate, endDate)
        console.log(reservationsBetweenDates)

        if(reservationsBetweenDates.length >= MAX_RESERVATION_AT_SAME_TIME){
            const message = "[reservations] Inserting reservation failed. The reservation conflicts with others reservations";
            console.error(message);
            res.status(424).json({
                data: null,
                error: { message: message }
            });
            return true
        }
        return false
    }
    catch(err){
        const message = "[reservations] " + err
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
        return true
    }
}


router
    .use(auth)
    .get( async (req, res) => {
        try{
            const reservations = await reservationsDB.getReservations();
            return res.status(200).json({
                data: {reservations: reservations},
                error: null
            });
        }
        catch(err){
            const message = "[reservations] " + err
            console.error(message);
            return res.status(500).json({
                data: null,
                error: { message: message }
            });
        }
    })
    .put(async (req, res) => {
        const { startDate, endDate, email, phone, immatriculation, paymentMode, formulaType, vehicleTypeId } = req.body
        let userId = null
        let insertedId = null
        console.log(req)
        console.log(req.user)
        if(req.user)
            userId = req.user.id

        // Check the inputs validity !!!

        try{
            if(await isHolidaysConflicts(req, res))
                return

            if(await isOpeningHoursConflicts(req, res))
                return

            if(await isReservationsConflicts(req, res))
                return

            if(formulaType === CUSTOM_FORMULA_TYPE) {
                let transactionError = false
                let transaction = await dbService.transaction()
                let tasks = req.body.tasks

                let formulaInsert = async () => formulasDB.insertFormula(DEFAULT_FORMULA_LABEL, CUSTOM_FORMULA_TYPE_ID, transaction)

                let formulaTaskInsert = async (lastResult, results, taskId) => {
                    // results[0].insertId correspond to the id of the inserted formula
                    return await formulasTasksDB.insertFormulaTask(results[0].insertId, taskId, transaction)
                }

                let transactionExecutor = await formulaInsert()
                tasks.forEach( taskId => {
                    transactionExecutor.query((lastResult, results) => formulaTaskInsert(lastResult, results, taskId))
                })
                await transactionExecutor.query((lastResult, results) => reservationsDB.insertReservation(INITIAL_RESERVATION_STATE,
                    startDate, endDate, email, phone, immatriculation, paymentMode, userId, results[0].insertId, vehicleTypeId, transaction))

                await transactionExecutor.rollback(err => {
                    console.error("Error in transaction, rollback. Reason: " + err)
                    transactionError = true
                })
                const result = await dbService.commit(transaction)

                insertedId = result[result.length-1].insertId

                if(transactionError){
                    const message = "[reservations] Transaction inserting formula, formula_task or reservation failed. Something went wrong " +
                        "in transaction inserting a formula, formula_task or reservation in database";
                    console.error(message);
                    return res.status(424).json({
                        data: null,
                        error: { message: message }
                    });
                }
            }
            else {
                const formulaId = req.body.formulaId

                const result = await reservationsDB.insertReservation(INITIAL_RESERVATION_STATE,
                    startDate, endDate, email, phone, immatriculation, paymentMode, userId, formulaId, vehicleTypeId);

                if(!result){
                    const message = "[reservations] Inserting reservation failed. Something went wrong inserting a reservation in database";
                    console.error(message);
                    return res.status(424).json({
                        data: null,
                        error: { message: message }
                    });
                }
                insertedId = result
            }

            return res.status(201).json({
                data: { message: "Inserting reservation succeed", insertedId: insertedId },
                error: null
            });
        }
        catch(err){
            const message = "[reservations] " + err
            console.error(message);
            return res.status(500).json({
                data: null,
                error: { message: message }
            });
        }
    })

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});