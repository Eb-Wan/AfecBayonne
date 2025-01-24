const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

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

const userModel = mongoose.model("user", userSchema);

mongoose.connect(process.env.DB_URL).then(() => {console.log("Db is connected")}).catch((err) => console.error(err));

userModel.create({ name:"Gérard", email: "gerard@email.com", age: "45", password: "password"})
.then((response) => {
    console.log(response);
}).catch(error => { console.error(error);});