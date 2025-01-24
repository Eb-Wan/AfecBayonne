const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB is connected");
  } catch (error) {
    console.error(`Error while connecting DB : ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;