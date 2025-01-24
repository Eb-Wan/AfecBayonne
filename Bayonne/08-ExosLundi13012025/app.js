const { error } = require("console");
const express = require("express");

const app = express();
const PORT = 3000;

app.get("/success", (req, res, next) => {
    res.status(200).json({
        status: 200,
        message: "Success",
        details: "It worked. Thats it. There is nothing else to see here."
    });
});
app.get("/async", async (req, res, next) => {
    try {
        throw new Error("Érreur async");
    } catch (error) {
        next(error);
    }
});
app.get("/sync", (req, res, next) => {
    next(new Error("Érreur sync"));
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    let errorMessage = "Érreur"
    if (statusCode == 404) {
        errorMessage = error.message || "Oh bah... Bah ça alors ? Il l'a pas vu.";
    }
    else if (statusCode == 500) {
        errorMessage = error.message || "J'te jure, je vais éclater l'équipe, c'est quoi ce travail de -.";
    }
    res.status(statusCode).json({
        status: statusCode,
        message: errorMessage,
        details: process.env.NODE_ENV == "production" ? undefined : error.details

    });
});

app.listen(PORT, () => {
    console.log("ok");
});