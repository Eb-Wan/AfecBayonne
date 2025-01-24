const imageModel = require("../models/imageModel");
const userModel = require("../models/userModel");
const Error = require("../classes/error");
const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");

const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.getImages = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const images = await imageModel.find({ uploader: _id });
        const urls = images.map(e => e.url);
        if (images.length < 1) throw new Error(404, "Images not found");
        else res.status(200).json({ success: true, urls });
    } catch (error) {
        if (!error.statusCode) {
            error.detailedMessage = error.message;
            error.message = "Something went wrong"
        }
        next(error);
    }
};

exports.uploadImage = async (req, res, next) => {
    try {
        const { uploader } = req.body;
        const user = await userModel.findById (uploader);
        if (!req.file || !user) throw new Error(400, "No files uploaded");
        const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'ComNetImages' });
        fs.unlinkSync(req.file.path);
        const image = new imageModel({
            url: uploadResult.secure_url,
            uploader: uploader
        });
        await image.save();
        res.status(201).json({ success: true, message: "Image uploaded" });
    } catch (error) {
        fs.unlinkSync(req.file.path);
        if (!error.statusCode) {
            error.detailedMessage = error.message;
            error.message = "Something went wrong"
        }
        next(error);
    }
};

exports.removeImage = async (req, res) => {
    try {
        const { url } = req.params;
        const image = await imageModel.findById(url);
        if (!image) throw new Error(404, "Image not found");
        await imageModel.findByIdAndDelete(url);
        await cloudinary.uploader.destroy(image.public_id);
        res.status(200).json({ success: true, message: "Image removed" });
    } catch (error) {
        if (!error.statusCode) {
            error.detailedMessage = error.message;
            error.message = "Something went wrong"
        }
        next(error);
    }
};