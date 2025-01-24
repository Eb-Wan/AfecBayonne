const axios = require("axios");
const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome !</h1>");
});

const API_URL = "https://jsonplaceholder.typicode.com/users/";
app.get("/users/", async (req, res, next) => {
    try {
        const response = await axios.get(API_URL);
        res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
});
app.get("/users/:id", async (req, res, next) => {
    try {
        const response = await axios.get(API_URL + req.params.id);
        res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
});


app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        message: "Pété",
        error: err.message,
    });
});


app.listen(PORT, () => {
    console.log("ok");
});