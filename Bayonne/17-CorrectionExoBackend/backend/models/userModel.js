const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = new mongoose.Schema({
    name: { type: String, required: [true, "Username is required"], unique: true },
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: { type: String, required: [true, "password is required"] },
    role: {type: String, default: "user", enum: ["user", "admin"]}
}, { timestamps: true });

userShema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
module.exports = mongoose.model("users", userShema);