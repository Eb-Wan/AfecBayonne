const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const data = require ("./backend/data.js");
const cors = require('cors');
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/data", (req, res) => {
    try {
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post("/api/data", (req, res) => {
    try {
        const data = req.body;
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

app.get("/api/error", (req, res) => {
    res.status(500).json({ success: false, message: "Ceci est la route qui ne marche pas. (c'est bête hein ?)" });
})

app.listen(PORT, () => console.log("Server is listening on", PORT));