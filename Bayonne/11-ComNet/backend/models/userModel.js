const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type:String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/] },
    password: { type: String, required: true, unique: true },
    accessRights: { type: String, required: true, default: "Normal" },
    pfpUrl: { type: String }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified(`password`)) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
module.exports = mongoose.model("user", userSchema);