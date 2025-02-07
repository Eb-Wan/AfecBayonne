const Cart = require('../models/Cart');
const User = require("../models/User");
const Ad = require("../models/Annonce");

//Ajouter au panier un objet
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findById(userId);
        const ad = await Ad.findById(productId);

        if (!user || !ad) {
            res.status(404).json({ error: "User or ad not found" });
            return;
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            cart.items.push({ productId });
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Recuperer le panier
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCarts = async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Enlever un objet du panier
exports.removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        
        const cart = await Cart.findOneAndUpdate(
            { 'items._id': itemId },
            { $pull: { items: { _id: itemId } } },
            { new: true }
        );
        if (cart) res.status(200).json(cart);
        else res.status(404).json({ error: "Item not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
