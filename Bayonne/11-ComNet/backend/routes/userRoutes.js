const express = require("express");
const router = express.Router();

const { authUser, createUser, updateUser, removeUser } = require("../controllers/userController");

router.post("/", authUser);
router.post("/register", createUser);
router.put("/:id", updateUser);
router.delete("/:id", removeUser);

module.exports = router;