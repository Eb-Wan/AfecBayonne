const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  getCarts,
} = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/:userId", auth, getCart);
router.get("/", getCarts);
router.delete("/:itemId", removeFromCart);

module.exports = router;
