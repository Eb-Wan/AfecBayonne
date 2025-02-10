const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  removeOrder,
} = require("../controllers/orderController");

router.post("/:cartId", auth, placeOrder);
router.get("/:userId", auth, getUserOrders);
router.delete("/:cartId", auth, removeOrder);

module.exports = router;
