import {respectOpeningHours} from "../../../utils";
import dbService from "../../../database/db.service";

const reservationsDB = require('../../../database/reservations.db.service');
const availabilitiesDB = require('../../../database/availabilities.db.service');
const formulasDB = require('../../../database/formulas.db.service');
const formulasTasksDB = require('../../../database/formulasTasks.db.service');

const INITIAL_RESERVATION_STATE = "EN ATTENTE"
const MAX_RESERVATION_AT_SAME_TIME = 1
const CUSTOM_FORMULA_TYPE = "custom"
const CUSTOM_FORMULA_TYPE_ID = 2
const DEFAULT_FORMULA_LABEL = "DEFAULT LABEL"
const DEFAULT_FORMULA_DESCRIPTION = "DEFAULT DESCRIPTION"

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'GET': return handleGet(req, res);
        case 'PUT': return handlePut(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).json({
                data: null,
                error: { message: 'Method ' + method + ' not allowed' }
            });
    }
}

const handleGet = async (req, res) => {
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
}

const handlePut = async(req, res) => {
    const { startDate, endDate, email, phone, immatriculation, formulaType } = req.body
    const userId = null // To change if user is connected
    let insertedId = null

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
            let tasks = [1, 2, 3, 4] // Change to retrieve from request

            let formulaInsert = async () => formulasDB.insertFormula(DEFAULT_FORMULA_LABEL
                , DEFAULT_FORMULA_DESCRIPTION, CUSTOM_FORMULA_TYPE_ID, transaction)

            let formulaTaskInsert = async (lastResult, results, taskId) => {
                // results[0].insertId correspond to the id of the inserted formula
                return await formulasTasksDB.insertFormulaTask(results[0].insertId, taskId, transaction)
            }

            let transactionExecutor = await formulaInsert()
            tasks.forEach( taskId => {
                transactionExecutor.query((lastResult, results) => formulaTaskInsert(lastResult, results, taskId))
            })
            await transactionExecutor.query((lastResult, results) => reservationsDB.insertReservation(INITIAL_RESERVATION_STATE,
                startDate, endDate, email, phone, immatriculation, userId, results[0].insertId, transaction))

            await transactionExecutor.rollback(err => {
                console.error("Error in transaction, rollback. Reason: " + err)
                transactionError = true
            })
            await dbService.commit(transaction)

            if(transactionError){
                const message = "[reservations] Transaction inserting formula, formula_task or reservation failed. Something went wrong " +
                    "in transaction inserting a formula, formula_task or reservation in database";
                console.error(message);
                return res.status(424).json({
                    data: null,
                    error: { message: message }
                });
            }
            insertedId = transactionExecutor.query((lastResult) => lastResult.insertId)
        }
        else {
            const formulaId = req.body.formulaId

            const result = await reservationsDB.insertReservation(INITIAL_RESERVATION_STATE,
                startDate, endDate, email, phone, immatriculation, userId, formulaId);

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
}

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
                openingHours.morning_start_time, openingHours.morning_end_time)
            && !respectOpeningHours(startReservationTime, endReservationTime,
                openingHours.evening_start_time, openingHours.evening_end_time)
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