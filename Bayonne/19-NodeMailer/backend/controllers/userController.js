const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel")
const Exeption = require("../classes/Exeption")
const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        const passMatch = user ? await bcrypt.compare(password, user.password) : false;
        if (!passMatch) throw new Exeption("Invalid email or password", 400);
        const token = generateToken(user.id);
        res.cookie("token", token, {httpOnly: true, maxAge: 1*60*60*1000});
        res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
}
exports.logout = async (req, res, next) => {
    try {
        res.cookie("token", "", {httpOnly: true, maxAge: -1});
        res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) throw new Exeption(`AxumentRequiredException:${!name ? " Name is undefined" : ""}${!email ? " Email is undefined" : ""}${!password ? " Password is undefined" : ""}`);
        
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        await userModel.create({ name, email, password: hashPass });
        res.status(201).json({ success: true });
    } catch (err) {
        if (err.code) {
            if (err.code === 11000) err = new Exeption (`UserAlreadyExistsException: ${JSON.stringify(err.keyValue).replaceAll("\"", "'")} already taken by another user`, 400);
        }
        next(err);
    }
}