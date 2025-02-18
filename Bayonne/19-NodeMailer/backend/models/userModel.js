const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type:String, minLength: 3, maxLength: 50, required: true},
    email: {type:String, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ["unverified", "user", "admin"], default: "unverified"}
});

module.exports = mongoose.model("users", userSchema);