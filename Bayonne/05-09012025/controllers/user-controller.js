const user = require("../models/user")

exports.getAllUsers = async (req, res) => {
    try {
        const users = await user.find();
        if (users) res.status(200).json(users);
        else res.status(404).json({ message :"User not found" });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Pignouf", error});
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const search = (req.query);
        console.log(search);
        const users = await user.find(search);
        if (users) res.status(200).json(users);
        else res.status(404).json({ message :"User not found" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Pignouf", error });
    }
};

exports.createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const newUser = await user.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Pignouf", error});
    }
};