const { body, param } = require("express-validator");

exports.validateRegisterUser = [
    body("name").trim().exists().notEmpty().withMessage("Username is required").isLength({max:16}).withMessage("Username max length is 16"),
    body("email").trim().exists().notEmpty().withMessage("Email is required").isEmail().withMessage("Must be an email"),
    body("password").trim().exists().notEmpty().withMessage("Password is required")
];