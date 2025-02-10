const express = require("express");
const router = express.Router();

const { sendVerification, authUser, getUser, createUser, updateUser, removeUser } = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/sendverification", auth, sendVerification);
router.post("/auth", authUser);
router.post("/register", createUser);
router.get("/", auth, getUser)
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, removeUser);

module.exports = router;