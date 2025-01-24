const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            connectTimeoutMS: 20000, 
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 30000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;