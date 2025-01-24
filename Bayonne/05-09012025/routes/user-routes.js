const express =  require("express");
const usrCtrl = require("../controllers/user-controller")
const router = express.Router();

router.get("/users/", usrCtrl.getAllUsers);
router.get("/users/user", usrCtrl.getOneUser);
router.post("/users/adduser/", usrCtrl.createUser);



module.exports = router;