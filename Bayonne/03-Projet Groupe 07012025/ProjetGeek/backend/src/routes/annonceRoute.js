const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");

const router = express.Router();

const {
  createAd,
  getAllAds,
  getAdDetails,
  removeAd,
} = require("../controllers/adController");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("imageFile"), auth, createAd);
router.get("/", getAllAds);
router.get("/:id", getAdDetails);
router.delete("/:id", auth, removeAd);
module.exports = router;
