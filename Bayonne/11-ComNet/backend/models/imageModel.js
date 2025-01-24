const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true  },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref:"user", required: true }
}, { timestamps: true });

module.exports = mongoose.model("image", imageSchema);