const { body, } = require("express-validator");
const { validateRequest } = require("./global");

const validateCategoryCreate = [
    body("name")
    .trim().notEmpty().withMessage("Category name required.")
    .isLength({min: 3}).withMessage("Category name must be at least 3 characters."),

    validateRequest("body"),
]

module.exports = {validateCategoryCreate, };