const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection success");
    } catch (error) {
        console.error("DB connection error: ", error);
    }
};

module.exports = connectDB;