const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connexion réussie !`);
  } catch (error) {
    console.error(`Erreur lors de la connexion à MongoDB : ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
