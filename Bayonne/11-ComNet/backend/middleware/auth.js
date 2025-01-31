const jwt = require("jsonwebtoken");
const Error = require("../classes/error");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.comNetToken;
        if (token) {
            const { _id } = jwt.decode(token);
            if (_id) {
                req.auth = _id;
                next();
            }
            else throw new Error(403, "Token is invalid");

        } else throw new Error(400, "Token is invalid");
    } catch (error) {
        next(error);
    }
    
}

module.exports = auth;