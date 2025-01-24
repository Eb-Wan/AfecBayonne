const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "./uploads/" });

const { getImages, uploadImage,removeImage } = require("../controllers/imageController");

router.get("/:_id", getImages)
router.post("/", upload.single("img"),uploadImage);
router.delete("/:url", removeImage); 

module.exports = router;