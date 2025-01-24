const {MongoClient} = require ('mongodb');
const DB_URL = "mongodb+srv://EB-Wan:PMqJyg6rrT4RYvKi@clusterebwan0.az4wc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterEBWan0";
const DB_NAME = "GeekProjectDB";
const express = require ('express');
const PORT = 4000;

const app = express();

app.use(express.json());

class UserClass {
    constructor(userName, eMail, pass) {
        this.userName = userName;
        this.eMail = eMail;
        this.pass = pass;
    }
}
class AdClass {
    constructor(title, description, type, price, userId) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.price = price;
        this.userId = userId;
    }
}
class CartClass {
    constructor(idUser, idAds) {
        this.idUser = idUser;
        this.idAds = idAds;
    }
}
class OrderClass {
    constructor(idUser, idAds, status) {
        this.idUser = idUser;
        this.idAds = idAds;
        this.status = status;
    }
}


async function InsertUser(userName, eMail, password) {
    const newElement = new UserClass(userName, eMail, password);
    const result = await Insert("Users", newElement);
    if (result == true) console.log("User inserted :", newElement);
    else console.log(result);
}
async function InsertAd(title, description, type, price, userId) {
    const newElement = new AdClass(title, description, type, price, userId);
    const result = await Insert("Ads", newElement);
    if (result == true) console.log("Ad inserted :", newElement);
    else console.log(result);
}
async function InsertOrder(idUser, idAds, status) {
    const newElement = new OrderClassClass(idUser, idAds, status);
    const result = await Insert("Orders", newElement);
    if (result == true) console.log("Orders inserted :", newElement);
    else console.log(result);
}
async function Insert(collection, object) {
    const client = new MongoClient(DB_URL);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        db.collection(collection).insertOne(object, function(err, res) {
            if (err) throw err;
            client.close();
        });
    }
    catch (err) {
        console.error(err);
        return(err);
    }
    finally {
        return(true);
    }
}

// Inscription de l'utilisateur
app.post('/api/users/register', (req, res) => {
    const {UserName, EMail, Pass} = req.body;
    InsertUser(UserName, EMail, Pass);

    //Important
    //Implementer un find ici aussi, pour verifier si l'utilisateur existe déjà.


    res.send("User added");
});


// Login de l'utilisateur
app.post('/api/users/login', async function(req, resolve) {
    const {userName, eMail, pass} = req.body
    const client = new MongoClient(DB_URL);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const User = new UserClass(userName, eMail, pass);
        console.log(User);

        const result = await db.collection("Users").findOne(User);
        if (!result) {
            console.error("An error occurred");
            resolve.send("Login failed");
            client.close();
            return;
        }
        console.log(result);
        resolve.send("User logged in");
        client.close();
    }
    catch (err) {
        console.error(err);
    }
});

// // Deconnexion utilisateur
app.post('/api/users/logout', (req, res) => {
    res.send("User logged out");
});

app.listen(PORT, () => {
    console.log(`Le serveur est lancée sur le port http://localhost:${PORT}`);
})

//Failed to load resource: the server responded with a status of 404 (Not Found)

//const collection = await db.listCollections().toArray();
// console.log(`Les collections disponibles: `, collection.map(col => col.name));