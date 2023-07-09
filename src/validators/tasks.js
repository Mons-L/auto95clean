import {check, initValidation} from "../middleware/handler";

const putValidator = initValidation(
    [
        check('label').isLength({ min: 1 }).withMessage('The label must be as least 1 char length'),
        check('price').isFloat().withMessage('The price must be a float')
    ]
);

const postValidator = initValidation(
    [
        check('label').isLength({ min: 1 }).withMessage('The label must be as least 1 char length'),
        check('price').isFloat().withMessage('The price must be a float')
    ]
);