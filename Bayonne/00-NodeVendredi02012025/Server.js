const HTTP = require("http");
const PORT = 3000;

const SERVER = HTTP.createServer((Req, Res) => {
    Res.statusCode = 200;
    Res.setHeader("Content-Type", "text/plain");
    Res.end("Result");
});

SERVER.listen(PORT, () => {
    console.log("OK");
});