const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const { v2: cloudinary } = require("cloudinary");

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const app = express();

cloudinary.config({ 
    cloud_name: 'dr7nus3zh', 
    api_key: '465376694422428', 
    api_secret: '7-dob8-TcV48cDg5BMeOb9mSk_w'
});

const upload = multer({ dest: "uploads/" });

mongoose.connect(DB_URI).then(() => console.log("DB is connectd...")).catch(error => console.error(error));

const imageSchema = new mongoose.Schema({
    title:String,
    description:String,
    public_id:String,
    url:String,
});

const imageModel = mongoose.model("Image", imageSchema);

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(PORT, () => {
    console.log("Listening on", PORT);
});

app.post("/image", upload.single("imageFile"), async (req, res) => {
    const {title, description} = req.body;
    console.log(title, description)
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'images'
        });

        fs.unlinkSync(req.file.path);

        const image = new imageModel({
            title,
            description,
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url
        });

        await image.save();

        res.status(201).json({ image });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "T'as tout n*qué avec ton image !" })
    }
});

app.get("/image", async (req, res) => {
    try {
        const image = await imageModel.find();
        res.status(200).json(image);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:"C'est pété." });
    }
});

app.get("/image/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const image = await imageModel.findById(id);
        res.status(200).json(image);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:"C'est pété." });
    }
});

app.put("/image/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        
        const image = await imageModel.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!image)  return res.status(404).json({ message: "ntm fdp, tu casse les c avec tes images pétées" });
                
        res.status(200).json(image);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:"C'est pété." });
    }
});

app.delete("/image/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const image = await imageModel.findById(id);
        if (!image)  return res.status(404).json({ message: "ntm fdp, tu casse les c avec tes images pétées" });
        await imageModel.findByIdAndDelete(id);
        await cloudinary.uploader.destroy(image.public_id);

        res.status(200).json({ message:"Success mes balls !" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:"C'est pété." });
    }
});

app.get("/upload", (req,res) => {
    res.render("form");
});