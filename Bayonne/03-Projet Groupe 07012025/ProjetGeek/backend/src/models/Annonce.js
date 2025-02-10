const mongoose = require("mongoose");

// Définition du schéma
const adSchema = new mongoose.Schema({
  categorie: {
    type: String,
    enum: ["jeux", "manga", "autres"],
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["vente", "don"], required: true },
  price: { type: Number, default: 0, required: true },
  public_id: { type: String },
  urlImage: { type: String },
});

module.exports = mongoose.model("Ad", adSchema);
