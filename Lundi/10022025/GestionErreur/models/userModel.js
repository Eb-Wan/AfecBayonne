const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type:String, minLength: 3, maxLength: 50, required: true},
    email: {type:String, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
    age: {type:Number, min: 18, max: 100},
    password: {type: String, minLength: 8, required: true},
    isRetired: {
        type: Boolean,
        default: function () {
            return this.age > 60;
        }
    }
});

module.exports = mongoose.model("users", userSchema);