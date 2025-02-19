const jwt = require("jsonwebtoken");
const Exeption = require("../classes/Exeption");
const userModel = require("../models/userModel");

exports.jwtValidate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Exeption("No token provided", 304);
        const { id } = jwt.decode(token);
        const user = await userModel.findById(id).select("name role isverified email");
        if (!user) throw new Exeption("Invalid account", 403)
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};


exports.isVerified = (req, res, next) => {
    try {
        if (!req.user.isverified) throw new Exeption("Your email has not been verified", 403)
        next();
    } catch (error) {
        next(error);
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") throw new Exeption("Forbidden", 403)
        next();
    } catch (error) {
        next(error);
    }
};