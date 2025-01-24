const FS = require("fs");
const HTTP = require("http");
const PORT = 3000;

const MENU_PATH = "public/menu.json";
let menuContents = JSON.stringify(
[
    {meal:"Boeuf Bourgignon", price: "15€"},
    {meal:"Blanquette", price: "15€"},
    {meal:"Fondu Savoyarde", price: "10€"},
    {meal:"Porc Provençal", price: "12€"},
    {meal:"Raclette", price: "8€"}
]);



const SERVER = HTTP.createServer(request)
SERVER.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});

async function request(req, res) {
    if (req.url.toLowerCase() === "/create-menu") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");

        let result = await WriteMenuFile();
        if (result == null) res.end(`<h1>The program failed hasn't it ? Oh no, uh anyways.</h1>`);
        else if (result) res.end(`<h1>Menu created successfully ! What a surprise !</h1>`);
    }
    else if (req.url.toLowerCase() === "/menu") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");

        let result = await ReadMenuFile();
        if (result == null) res.end(`<h1>The program failed hasn't it ? Oh no, uh anyways.</h1><button onClick="menuCreate()">Try creating the menu</button><script>function menuCreate() {window.location.href="/create-menu";}</script>`);
        else if (result) {
            res.setHeader("Content-Type", "application/json");
            res.end(result);
        }
    }
    else if (req.url.toLowerCase() === "/accueil") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(`<h1>Welcome to the ultimate menu website !</h1><button onClick="menuRedirect()">See menu !</button><script>function menuRedirect() {window.location.href="/menu";}</script>`);
    }
    else if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(`<script>window.location.replace("/accueil");</script>`);
    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(`<h1>Wooops, you just lost yourself. Good luck finding your way.</h1>`);
    }
}

function WriteMenuFile() {
    return new Promise((res, rej) => {
        FS.writeFile(MENU_PATH, menuContents, (err) => {
            if (err) {
                res(null);
            }
            res(true);
        })
    });
}

function ReadMenuFile() {
    return new Promise((res, rej) => {
        FS.readFile(MENU_PATH, "utf-8", (err, data) => {
            if (err) {
                res(null);
            }
            res(data);
        })
    });
}