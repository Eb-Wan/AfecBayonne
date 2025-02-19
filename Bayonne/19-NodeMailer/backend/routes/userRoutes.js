const router = require("express").Router();
const Exeption = require("../classes/Exeption");


const {jwtValidate, isVerified, isAdmin } = require("../middlewares/protectMiddleware");
const { getUser, login, logout, register, verifyEmail } = require("../controllers/userController");

router.get("/", jwtValidate, getUser);
router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);
router.get("/verify/:token", verifyEmail);

module.exports = router;