const FS = require("fs");
let JsonData;
let TestData = `{
    "name": "Pignouf",
    "age": 6145,
    "email": "pignoufpignolé@email.com"
}`;

FS.readFile("JSON/00-data.json", "utf8", (Error, Data) => {
        if (Error) {
            console.log(Error);
            return;
        }
        JsonData = JSON.parse(Data);
        Log();
});

FS.writeFile("JSON/01-data.json", TestData, (Error) => {
    if (Error) {
        console.log(Error);
        return;
    }
    console.log("Success");
});

function Log() {
    console.log(JsonData[0].name);
}
