const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Ad = require('../models/Annonce');

//Finaliser une commande
exports.placeOrder = async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await Cart.findById(cartId);
        if (!cart) {
            res.status(404).json({ error: "Cart not found" });
            return;
        }
        let totalPrice = 0;
        
        const userId = cart.userId;
        let items = cart.items.map(element => element.productId);

        if(!userId || items.length < 1) {
            await Cart.findByIdAndDelete(cartId);
            throw new Error("Il y a eu une érreur lors de la validation du panier");
        }

        items = await Ad.find({ '_id': { $in: items } });
        items.forEach(element => totalPrice += element.price);

        const order = new Order({ userId, totalPrice });
        items.forEach(element => order.items.push({ productId: element.id }));
        await order.save();

        await Cart.findByIdAndDelete(cartId);

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Liste des commandes utilisateurs
exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.findById(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orders = await Order.findByIdAndDelete(orderId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
