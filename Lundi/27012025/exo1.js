const express = require("express");
const dotenv = require("dotenv");

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const DB_URL = process.env.DB_URL;
const client = new MongoClient(DB_URL);

app.get("/products", async (req, res) => {
    try {
        const db = client.db("DBLundi").collection("products");
        const result = db.find({ isDeleted: false });
        let docs = [];
        for await (const doc of result) {
            docs.push(doc);
        }
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.post("/products", async (req, res) => {
    try {
        const { name, price } = req.body;
        const isDeleted = false;
        const db = client.db("DBLundi").collection("products");
        await db.insertOne({ name, price, isDeleted, deletedAt: null });
        res.status(200).json({ message:"1 document inserted" });
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.delete("/products", async (req, res) => {
    try {
        const { name } = req.body;
        const db = client.db("DBLundi").collection("products");
        const time = new Date().toISOString();
        const deleteValue = { $set: { isDeleted: true, deletedAt: time } };
        await db.updateOne({ name }, deleteValue);
        res.status(200).json({ message:"1 document deleted" });
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.listen(PORT, () => console.log(PORT));