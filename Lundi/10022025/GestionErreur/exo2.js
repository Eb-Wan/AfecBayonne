const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
app.use(express.json())
dotenv.config();

const PORT = 3000;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI).then(result => console.log("DB is connected")).catch(error => console.error(error));

const userSchema = new mongoose.Schema ({
    name: { type:String },
    email: { type:String }
});
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await postModel.deleteMany({ userId: this._id });
        next();
    } catch (error) {
        next(error);
    }
});
const userModel = mongoose.model("users", userSchema);

const postSchema = new mongoose.Schema ({
    userId: { type: mongoose.Schema.Types.ObjectId },
    post: { type: String }
});
const postModel = mongoose.model("posts", postSchema);

app.get("/users", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await postModel.find({ userId: id });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/seed", async (req, res) => {
    try {
        let newUsers = [];
        for (let i = 0; i < 10; i++) {
            const userName = "User" + i;
            const userEmail = "email" + i + "@email.com";
            newUsers.push({ name: userName, email: userEmail });
            
        }
        const users = await userModel.insertMany(newUsers);
        
        let newPosts = [];
        for (let i = 0; i < 10; i++) {
            const userId = users[i]._id;
            
            newPosts.push({ userId, post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis gravida tellus. Etiam felis neque, placerat id elit nec, eleifend vehicula dolor. Aenean quis dignissim massa. Nulla est neque, pharetra a elit in, elementum dapibus leo. Sed facilisis rutrum eros a elementum. Morbi vel blandit lorem. Sed tincidunt pretium leo. " });
            newPosts.push({ userId, post: "Phasellus nisi turpis, iaculis a iaculis nec, vulputate non ex. Ut in vestibulum velit. Nullam et enim ut lorem dapibus commodo. Donec sed tempor sem, eu tempor purus. Proin eu condimentum lacus. Integer accumsan velit at tellus pulvinar, eget ullamcorper erat sagittis. Ut urna leo, molestie sed pretium vel, faucibus quis neque. " });
            newPosts.push({ userId, post: "Etiam nibh ligula, sodales ut eros in, vehicula tincidunt odio. Quisque suscipit elementum nisl, nec varius nisl consequat ac. Aenean tempor sodales porta. Phasellus nisi turpis, iaculis a iaculis nec, vulputate non ex. Ut in vestibulum velit. Nullam et enim ut lorem dapibus commodo. Donec sed tempor sem, eu tempor purus." });
            
        }
        await postModel.insertMany(newPosts);
        res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (user) {
            await user.deleteOne();
        } else {
            throw new Error("No user found");
        }
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
});

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
})

app.listen(PORT, () => console.log("Listening on", PORT));