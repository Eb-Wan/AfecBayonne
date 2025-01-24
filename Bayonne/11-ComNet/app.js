const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");
const bodyParser = require("body-parser");

const userRoutes = require("./backend/routes/userRoutes");
const imageRoute = require("./backend/routes/imageRoutes");
const errorHandler = require("./backend/middleware/errorHandler")

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./frontend/public"));

app.set("view engine", "ejs");
app.set("views", "./frontend/views");

app.use("/api/user", userRoutes);
app.use("/api/image", imageRoute);

app.use(errorHandler);

app.get("/", (req,res, next) => {
    res.render("home");
});
app.get("/chat", (req,res, next) => {
    res.render("chat");
});
app.get("/login", (req,res, next) => {
    res.render("login");
});
app.get("/register", (req,res, next) => {
    res.render("register");
});

app.use((req, res) => { 
    res.status(404).render("404");
}) 

app.use(errorHandler);



if (process.env.PORT) {
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}...`);
    });
} else console.error("Express has not been setup.")
