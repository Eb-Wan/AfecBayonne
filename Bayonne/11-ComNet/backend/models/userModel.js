const mongoose = require("mongoose");
const sgMail = require('@sendgrid/mail');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type:String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/] },
    password: { type: String, required: true, unique: true },
    accessRights: { type: String, required: true, default: "Unverified" },
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

userSchema.post("save", async function (next) {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: this.email,
            from: 'eb.wan.dev@gmail.com',
            subject: 'ComNet email address verification',
            text: 'You need to comfirm your email address to start using ComNet',
            html: '<a href="google.com">Click here to comfirm you email address</a>',
        }
        await sgMail.send(msg);
        next();
    } catch (error) {
        console.error(error);
    }
});


module.exports = mongoose.model("user", userSchema);