const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const app = express();

dotenv.config();
const PORT = process.env.PORT;
connectDB();

app.use(express.json());
app.use(express.urlencoded());
app.use("/users", userRoutes);

app.listen(PORT, () => console.log("Server is listening on port", PORT));