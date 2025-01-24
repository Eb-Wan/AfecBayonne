const EXPRESS = require("express");
const FS = require("fs");
const BODY_PARSER = require("body-parser");

const APP = EXPRESS();
const PORT = 3000;


let Items = [];


APP.use(BODY_PARSER.urlencoded({ extended: true }));
APP.use(EXPRESS.static("public"));


APP.get("/items", (Req, Res) => {
    const ItemList = Items.map(Item => `<li>${Item}</li>`).join("");
    Res.send(ItemList);
});


APP.post("/add-item", (Req, Res) => {
    const Item = Req.body.Item;
    if (Item) {
        Items.push(Item);
    }
    Res.send(`<li>${Item}</li>`);
});

let Counter = 0;
APP.post("/click-count", (Req, Res) => {
    Counter++;
    Res.status(200).send(Counter.toString());
});

APP.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});