const express = require("express");
const router = express.Router();


const { validateRequest } = require("../middlewares/validateRequest");
const { validateRegisterUser } = require("../validations/authValidation");

const { authMiddleware, adminCheck } = require("../middlewares/authMiddleware");

const { login, register, updateUser, deleteUser, getAllUsers } = require("../controllers/userController");

router.post("/login", login);
router.post("/register", validateRegisterUser, validateRequest, register);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser)
router.get("/get", authMiddleware, adminCheck, getAllUsers);

module.exports = router;