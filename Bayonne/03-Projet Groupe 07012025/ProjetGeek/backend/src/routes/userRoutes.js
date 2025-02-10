const express = require("express");

const router = express.Router();
const auth = require("..//middleware/auth");

// controllers
const {
  createUser,
  removeUser,
  getAllUsers,
  login,
  oauthLogin,
  logout,
} = require("../controllers/userController");

router.post("/create", createUser);
router.delete("/remove/:id", auth, removeUser);
router.get("/", auth, getAllUsers);
router.post("/login", login);
router.post("/logout", auth, logout);

module.exports = router;
