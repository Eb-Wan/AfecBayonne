const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:"user", required: true },
    contents:  { type: String, required: true },
    linksTo: { type: String },
    imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("message", messageSchema);