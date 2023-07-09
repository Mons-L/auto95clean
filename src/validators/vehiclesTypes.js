import {check, initValidation} from "../middleware/handler";

const putValidator = initValidation(
    [
        check('label').isLength({ min: 1 }).withMessage('The label must be as least 1 char length'),
        check('description').isLength({min: 10}).withMessage('The description must be as least 10 char length')
    ]
);

const postValidator = initValidation(
    [
        check('label').isLength({ min: 1 }).withMessage('The label must be as least 1 char length'),
        check('description').isLength({min: 10}).withMessage('The description must be as least 10 char length'),
        check('id').isNumeric().withMessage('The id must be a number')
    ]
);

const deleteValidator = initValidation(
    [
        check('id').isNumeric().withMessage('The id must be a number')
    ]
)