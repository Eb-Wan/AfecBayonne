const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

router.get("/", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        await userModel.create({ name, email, age, password });
        res.status(201).end();
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.query;
        const { name, email, age, password } = req.body;
        await userModel.findByIdAndUpdate(id, { name, email, age, password });
        res.status(200).end();
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.query;
        await userModel.findByIdAndRemove(id);
        res.status(200).end();
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
});

module.exports = router;