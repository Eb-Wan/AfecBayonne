const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

const Exeption = require("../classes/Exeption");

router.get("/", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
    try {
        const { name, email, age, password } = req.body;
        if (!name || !email || !age || !password) throw new Exeption(`AxumentRequiredException:${!name ? " Name is undefined" : ""}${!email ? " Email is undefined" : ""}${!age ? " Age is undefined" : ""}${!password ? " Password is undefined" : ""}`);
        
        await userModel.create({ name, email, age, password });
        res.status(201).end();
    } catch (err) {
        if (err.code) {
            if (err.code === 11000) err = new Exeption (`UserAlreadyExistsException: ${JSON.stringify(err.keyValue).replaceAll("\"", "'")} already taken by another user`, 400);
        }
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.query;
        const { name, email, age, password } = req.body;
        await userModel.findByIdAndUpdate(id, { name, email, age, password });
        if (!user) throw new Exeption("UserNotFound: There are no users with this id");
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.query;
        await userModel.findByIdAndRemove(id);
        if (!user) throw new Exeption("UserNotFound: There are no users with this id");
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;