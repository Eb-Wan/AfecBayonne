const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const errorHandler = require("../middlewares/errorHandler");
const Exeption = require("../classes/exeption");

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Exeption("No token provided", 401);
        const { id } = jwt.decode(token);
        const user = await userModel.findById(id)
        if (!user) throw new Exeption("Invalid account", 403)
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

exports.adminCheck = (req, res, next) => {
    try {
        if (req.user.role !== "admin") throw new Exeption("Forbidden", 403)
        next();
    } catch (error) {
        next(error);
    }
};