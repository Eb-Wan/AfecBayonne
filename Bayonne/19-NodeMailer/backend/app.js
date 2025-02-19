const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const {connectDB} = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const {errorMiddleware} = require("./middlewares/errorMiddleware");
const { jwtValidate, isVerified, isAdmin } = require("./middlewares/protectMiddleware");

const Exeption = require("./classes/Exeption");

connectDB();
app.use(cors({ origin: CORS_ORIGIN, credentials:true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended:false }))
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);

app.post("/api/send", (req, res, next) => {
    try {
        throw new Exeption("non", 404);
    } catch (error) {
        next(error);
    }
});

app.get("/isverified", jwtValidate, isVerified, (req, res, next) => {
    res.status(200).send("<h1>Congratulations, you are a verified user</h1>")
});

app.get("/isadmin", jwtValidate, isVerified, isAdmin, (req, res, next) => {
    res.status(200).send("<h1>Congratulations, you are an admin</h1>")
});

app.use(errorMiddleware);

if (PORT) app.listen(PORT, () => console.log("Server is listening on", PORT));
else {
    throw new Exeption("Env variables not setup");
    process.exit(1);
}