const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

connectDB();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log("Server is listening on", PORT));