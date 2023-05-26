import {check, validationResult} from "express-validator";
import nextConnect from "next-connect";

const initValidation = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)))
        const errors = validationResult(req)

        if(errors.isEmpty())
            return next()

        res.status(422).json({ errors: errors.array() })
    }
}

const put = middleware => nextConnect().put(middleware);
const post = middleware => nextConnect().post(middleware);
const deleteRequest = middleware => nextConnect().delete(middleware)

const handler = nextConnect()

export default handler

export { initValidation, put, post, deleteRequest, check }