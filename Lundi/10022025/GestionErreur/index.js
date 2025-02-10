const express = require("express");
const dotenv = require("dotenv");
const {errorHandler} = require("./middlewares/errorHandler.js");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const app = express();

dotenv.config();
const PORT = process.env.PORT;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log("Server is listening on port", PORT));