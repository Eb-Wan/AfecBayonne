const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const Exeption = require("../classes/Exeption");
const {sendEmail} = require("../services/sendgrid");

const { registerValidation } = require("../validators/userValidator");

const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});


exports.getUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await userModel.findById(id).select("name role isverified");
        res.status(200).json({ success: true, user });
    } catch (err) {
        next(err);
    }
}

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
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        
        const user = await userModel.create({ name, email, password: hashPass });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const mailHtml = `
            <h1>Email verification</h1>
            <p>Click <a href="http://localhost:3000/api/user/verify/${token}">here</a> to comfirm your email address</p>
            <p>Thanks mate !</p>
        `;

        const result = await sendEmail(user.email, "Email verification", "Email verification", mailHtml);
        if (result !== true) throw new Exeption(result.message, 500);
    
        const userToken = generateToken(user.id);
        res.cookie("token", userToken, {httpOnly: true, maxAge: 1*60*60*1000});
        res.status(201).json({ success: true });
    } catch (err) {
        if (err.code) {
            if (err.code === 11000) err = new Exeption (`User already exists`, 400);
        }
        next(err);
    }
}

exports.verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await userModel.findById(decoded.id);
        if (!user) throw new Exeption("Invalid user", 400);
    
        if (user.isverified) throw new Exeption("Email has already been verified", 400);
    
        user.isverified = true;
        await user.save();
    
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
  };