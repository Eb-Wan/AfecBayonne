const jwt = require("jsonwebtoken");
const Exeption = require("../classes/Exeption");

exports.jwtValidate = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const { id } = jwt.decode(token);
            if (id) {
                req.auth = id;
                next();
            }
            else throw new Exeption("Token is invalid", 401);
        } else throw new Exeption("No token provided", 401);
    } catch (error) {
        next(error);
    }
};