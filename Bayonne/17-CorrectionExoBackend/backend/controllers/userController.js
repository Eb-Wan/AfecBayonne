const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn:"1m" });

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await userModel.findOne({ email });
        const passMatch = (userLogin) ? await bcrypt.compare(password, userLogin.password) : false;
        if (!passMatch) throw new Error("Wrong email or password");
        const token = generateToken(userLogin.id);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ sucess:true });
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) throw new Error("Please complete all the fields");
        await userModel.create({ name, email, password });
        res.status(201).json({ success:true });
    } catch (error) {
        console.error(error);
        if (error.code) {
            if (error.code == 11000) error = new Error("This user already exists");
        }
        res.status(500).json({ success:false, message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        if (!name || !email) throw new Error("Please complete all the fields");
        await userModel.findByIdAndUpdate(id, { name, email });
        res.status(200).json({ success:true });
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        await userModel.findByIdAndDelete(id);
        res.status(200).json({ success:true });
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        if (!userModel) throw new Error("No users found");
        res.status(200).json({ success:true, users });
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
    }
};