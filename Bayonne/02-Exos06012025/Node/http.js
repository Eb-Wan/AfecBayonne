const HTTP = require("http");
const PORT = 3000;

const SERVER = HTTP.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Ta mère le fomateur qui se casse. Bien merci.");
});

SERVER.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
});