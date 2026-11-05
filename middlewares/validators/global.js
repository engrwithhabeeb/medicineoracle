const { validationResult, param, matchedData, } = require("express-validator");

function validateRequest(location) {
    return (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        req[location] = matchedData(req, {locations: [location]});

        next();
    }
}

const validateParamId = [
    param("id")
    .trim().notEmpty().withMessage("No id provided")
    .isInt({min: 1}).withMessage("Id must be a positive whole number")
    .toInt(),

    validateRequest("params")
]

module.exports = { validateRequest, validateParamId, };