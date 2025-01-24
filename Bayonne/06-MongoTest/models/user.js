const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},
{timestamps:true});


userShema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userShema.methods.comparePassword = async (candidatePassword) => {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("Users", userShema);