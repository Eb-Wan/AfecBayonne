const userModel = require("../models/userModel");

const Error = require("../classes/error");

const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => jwt.sign( { _id: _id } , process.env.JWT_SECRET, { expiresIn: "2 days" });

exports.sendVerification = async (req, res, next) => {
    try {
        const id = req.auth;
        if (!id) throw new Error(400, "No user id");
        const user = await userModel.findById(id);
        if (!user) throw new Error(404, "User not found");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: user.email,
            from: 'eb.wan.dev@gmail.com',
            subject: 'ComNet email address verification',
            text: 'You need to comfirm your email address to start using ComNet',
            html: '<a href="google.com">Click here to comfirm you email address</a>',
        }
        await sgMail.send(msg);
        res.status(200).json({ success: true })
    } catch (error) {
        next(error);
    }
}
exports.forgotPassword = async (req, res, next) => {
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'test@example.com',
        from: 'test@example.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail.send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    });
}

exports.getUser = async (req, res, next) => {
    try {
        const id = req.auth;
        if (!id) throw new Error(400, "No user id");
        const user = await userModel.findById(id);
        res.status(200).json({ success: true, data: { name: user.name, accessRights: user.accessRights }});
    } catch (error) {
        if (!error.statusCode) {
            error.detailedMessage = error.message;
            error.message = "Something went wrong";
        }
        next(error);
    }
}

exports.authUser = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const user = await userModel.findOne({$or: [{ email: name }, { name: name }]});
        const passMatch = user ? await bcrypt.compare(password, user.password) : false;
        if (passMatch) {
            const token = createToken(user._id);
            res.status(200).json({ success: true, token });
        }
        else throw new Error(400, "Password or email don't match");
    } catch (error) {
        if (!error.statusCode) {
            error.detailedMessage = error.message;
            error.message = "Something went wrong";
        }
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password, passMatch } = req.body;

        let user = await userModel.findOne({$or: [{ email: email }, { name: name }]});
        if (user) throw new Error(400, "Username or email already registered");

        if (password != passMatch) throw new Error(400, "Passwords don't match");
        user = await userModel.create({ name, email, password });
        const token = createToken(user.id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        if (!error.statusCode) {
            error.detailedMessage = error.message;
            error.message = "Something went wrong";
        }
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password, pfpUrl } = req.body;

        const user = await userModel.findOne({$or: [{ email: email }, { name: name }]});
        if (user) throw new Error(400, "Username or email already registered");

        const result = await userModel.findByIdAndUpdate( id, { name, email, password, pfpUrl });
        if (result) res.status(200).json({ success: true});
        else throw new Error(404, "User not found");
    } catch (error) {
        if (!error.statusCode) {
            error.detailedMessage = error.message;
            error.message = "Something went wrong";
        }
        next(error);
    }
};

exports.removeUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).json({ success: true });
    } catch (error) {
        if (!error.statusCode) {
            error.detailedMessage = error.message;
            error.message = "Something went wrong";
        }
        next(error);
    }
};