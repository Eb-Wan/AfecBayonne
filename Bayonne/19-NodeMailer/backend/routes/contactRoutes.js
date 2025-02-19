const router = require("express").Router();
const Exeption = require("../classes/Exeption");


const {jwtValidate, isVerified, isAdmin } = require("../middlewares/protectMiddleware");
const { sendMessage } = require("../controllers/contactController");

router.post("/", jwtValidate, isVerified, sendMessage);

module.exports = router;