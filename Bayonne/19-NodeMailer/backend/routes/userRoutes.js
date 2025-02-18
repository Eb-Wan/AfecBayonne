const router = require("express").Router();
const Exeption = require("../classes/Exeption");

const {jwtValidate} = require("../middlewares/protectMiddleware");
const { login, logout, register } = require("../controllers/userController")

router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);

module.exports = router;