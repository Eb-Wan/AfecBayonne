const mongoose = require("mongoose");
const userModel = require("./models/user");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");


const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Post routes ====================================================================================

// User routes ====================================================================================
app.get("/db/users", async (req, res) => {
    try {
        await mongoose.connect(DB_URI);
        const users = await userModel.find(req.query);
        if (users) res.status(200).json(users);
        else res.status(404).json({ success: false, message :"User not found" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Pignouf", error });
    }
});
app.post("/db/users/", async (req, res) => {
    try {
        const {name, email, password} = req.body;
        await mongoose.connect(DB_URI);
        const newUser = await userModel.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Pignouf", error });
    }
});
app.put("/db/users/", async (req, res) => {
    try {
        const {name, email, newName, newEmail} = req.body;
        await mongoose.connect(DB_URI);
        const result = await userModel.findOneAndUpdate({name, email}, {name: newName, email: newEmail});
        if (result) res.status(200).json({ success: true, message: "User updated" });
        else res.status(404).json({ success: false, message: "Nothing updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Pignouf", error });
    }
});
app.delete("/db/users/", async (req, res) => {
    try {
        const {name, email, password} = req.body;
        await mongoose.connect(DB_URI);
        const user = await userModel.findOne({ name, email });
        const passMatch = (user) ? await bcrypt.compare(password, user.password) : false;
        const result = (passMatch) ? await userModel.deleteOne({ name, email}) : false;
        if (result.deletedCount == 0 || result == false) res.status(404).json({ success: false, message: "Nothing removed" });
        else res.status(200).json({ success: true, message: "User deleted" })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Pignouf", error });
    }
});

app.listen(PORT, () => {
    console.log("Server is listening on", PORT);
});