const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const userModel = require("../models/userModel");
const argon2 = require("argon2");
const Exeption = require("../classes/Exeption");
const jwt = require("jsonwebtoken");
const {jwtValidate} = require("../middlewares/jwtValidate");
dotenv.config();

const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});

router.post("/auth", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        const passMatch = user ? await argon2.verify(user.password, password + "vEryCreativeSAlt") : false;
        if (!passMatch) throw new Exeption("Invalid email or password", 400);
        const token = generateToken(user._id);
        res.cookie("token", token, {httpOnly: true, maxAge: 1*60*60*1000});
        res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
});

router.get("/logout", async (req, res, next) => {
    try {
        res.cookie("token", "", {httpOnly: true, maxAge: -1});
        res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
});

router.get("/", jwtValidate, async (req, res, next) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

router.get("/id/:id", jwtValidate, async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) throw new Exeption("UserNotFound: There are no users with this id");
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

router.post("/findbyemail", async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) throw new Exeption("ArgumentRequiredException: No email was provided", 400);
        const user = await userModel.findOne({ email });
        if (!user) throw new Exeption("UserNotFound: There are no users registered with this email address");
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

router.post("/register", async (req, res, next) => {
    try {
        const { name, email, age, password } = req.body;
        if (!name || !email || !age || !password) throw new Exeption(`AxumentRequiredException:${!name ? " Name is undefined" : ""}${!email ? " Email is undefined" : ""}${!age ? " Age is undefined" : ""}${!password ? " Password is undefined" : ""}`);
        
        const hashPass = await argon2.hash(password + "vEryCreativeSAlt");
        await userModel.create({ name, email, age, password: hashPass });
        res.status(201).end();
    } catch (err) {
        if (err.code) {
            if (err.code === 11000) err = new Exeption (`UserAlreadyExistsException: ${JSON.stringify(err.keyValue).replaceAll("\"", "'")} already taken by another user`, 400);
        }
        next(err);
    }
});

router.put("/update", jwtValidate, async (req, res, next) => {
    try {
        const { id } = req.auth;
        const { name, email, age, password } = req.body;
        await userModel.findByIdAndUpdate(id, { name, email, age, password });
        if (!user) throw new Exeption("UserNotFound: There are no users with this id");
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

router.delete("/delete", jwtValidate, async (req, res, next) => {
    try {
        const { id } = req.auth;
        await userModel.findByIdAndRemove(id);
        if (!user) throw new Exeption("UserNotFound: There are no users with this id");
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

router.get("/profile", jwtValidate, async (req, res, next) => {
    try {
        const { id } = req.auth;
        const user = await userModel.findOne(id);
        if (!user) throw new Exeption("UserNotFound: There are no users with this id");
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;