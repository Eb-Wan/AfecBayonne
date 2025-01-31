const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const imageRoute = require("./routes/imageRoutes");
const errorHandler = require("./middleware/errorHandler")

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: CORS_ORIGIN, credentials:true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./frontend/public"));

app.use("/api/user", userRoutes);
app.use("/api/image", imageRoute);

app.use(errorHandler);

app.use((req, res) => { 
    res.status(404).render("404");
}) 

app.use(errorHandler);



if (process.env.PORT) {
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}...`);
    });
} else console.error("Express has not been setup.")
