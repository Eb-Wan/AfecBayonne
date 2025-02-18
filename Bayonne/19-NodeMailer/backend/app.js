const dotenv = require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;

const {connectDB} = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const {errorMiddleware} = require("./middlewares/errorMiddleware");

const Exeption = require("./classes/Exeption");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended:false }))
app.use("/api/user", userRoutes);

app.post("/api/send", (req, res, next) => {
    try {
        throw new Exeption("non", 404);
    } catch (error) {
        next(error);
    }
});

app.use(errorMiddleware);

if (PORT) app.listen(PORT, () => console.log("Server is listening on", PORT));
else {
    throw new Exeption("Env variables not setup");
    process.exit(1);
}