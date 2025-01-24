const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user-routes");
const testRoutes = require("./routes/test-routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/db", userRoutes);
app.use("/test", testRoutes);

app.listen(PORT, () => {
    console.log("Server running on ", PORT);
});