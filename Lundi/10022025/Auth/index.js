const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const {errorHandler} = require("./middlewares/errorHandler.js");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const app = express();
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT;
connectDB();

app.use(cors({ credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log("Server is listening on port", PORT));