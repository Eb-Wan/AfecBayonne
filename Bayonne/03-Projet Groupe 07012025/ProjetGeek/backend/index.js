const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const annonceRoutes = require("./src/routes/annonceRoute");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

const corsParams = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsParams));

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/ads", annonceRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Le serveur tourne sous http://localhost:${PORT}`);
});
