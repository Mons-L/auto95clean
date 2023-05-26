import {check, initValidation} from "../../middleware/handler";

const postValidator = initValidation(
    [
        check('label').isLength({ min: 1 }).withMessage('The label must be as least 1 char length'),
        check('description').isLength({min: 10}).withMessage('The description must be as least 10 char length'),
        check('image_path').isLength({min: 3}).withMessage('The image_path must be as least 3 char length'),
        check('price').isFloat().withMessage('The price must be a float'),
        check('quantity').isNumeric().withMessage('The quantity must be a number'),
    ]
);
const putValidator = initValidation(
    [
            check('label').isLength({ min: 1 }).withMessage('The label must be as least 1 char length'),
            check('description').isLength({min: 10}).withMessage('The description must be as least 10 char length'),
            check('image_path').isLength({min: 3}).withMessage('The image_path must be as least 3 char length'),
            check('price').isFloat().withMessage('The price must be a float'),
            check('quantity').isNumeric().withMessage('The quantity must be a number'),
    ]
);
