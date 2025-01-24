const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    const now = new Date();
    const message = `${req.method} ${req.url} ${now.toLocaleString()}`;
    fs.appendFile("./logs/logs.txt", `\n${message}`, (err) => {
        if (err) {
            console.error("Error", err);
        }
    });
    next();
});

app.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome</h1>");
});

app.post("/", (req, res) => {
    res.status(200).json({message: "Welcome"});
});



app.listen(PORT, () => console.log("Server is listening on ", PORT));