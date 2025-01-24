const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;
const DB_URI = "mongodb+srv://EB-Wan:PMqJyg6rrT4RYvKi@clusterebwan0.az4wc.mongodb.net/Test?retryWrites=true&w=majority&appName=ClusterEBWan0";

const userShema = new mongoose.Schema({
    id: {type:Number, auto};
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const user = mongoose.model("Users", userShema);

app.get("/db/users", async (req, res) => {
    try {
        const search = (req.query);
        await mongoose.connect(DB_URI);
        const users = await user.find(search);
        if (users) res.status(200).json(users);
        else res.status(404).json({ message :"User not found" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Pignouf", error });
    }
});

app.post("/db/users/adduser", async (req, res) => {
    try {
        const {name, email, password} = req.body;
        await mongoose.connect(DB_URI);
        const newUser = await user.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Pignouf", error});
    }
});

app.post("/echo", async function (req, res) {
    console.log(req.body);
    res.status(200).json(req.body);
});

app.listen(PORT, () => {
    console.log("Server is listening on", PORT);
});