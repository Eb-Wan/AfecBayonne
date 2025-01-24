const FS = require("fs");

FS.writeFile("public/data.txt", "contenu", (err) => {
    if (err) {
        console.error("Ca n'a pas marché patron.");
        return;
    }
    console.log("C'est bon.");
});

FS.readFile("public/data.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Ca n'a pas marché patron.");
        return;
    }
    console.log(data);
});