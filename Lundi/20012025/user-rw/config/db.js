const dotenv = require("dotenv");
const mongoose= require("mongoose");
dotenv.config();
const connectDB = () => mongoose.connect(process.env.DB_URL).then(() => {console.log("Db is connected")}).catch((err) => console.error(err));
module.exports = connectDB;