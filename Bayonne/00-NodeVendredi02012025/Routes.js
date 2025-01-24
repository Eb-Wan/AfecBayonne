const HTTP = require("http");
const PORT = 3000;

const SERVER = HTTP.createServer((Req, Res) => {
    if (Req.url === "/") {
        Res.statusCode = 200;
        Res.setHeader("Content-Type", "text/plain");
        Res.end("Acceptable.");
    } else if (Req.url.toLowerCase() === "/about") {
        Res.statusCode = 200;
        Res.setHeader("Content-Type", "text/plain");
        Res.end("What ? You really think there is something here ? There is nothing to see.\n\nThats not exactly true. There is this text right here... Not very interesting tho.");
    } else {
        Res.statusCode = 404;
        Res.setHeader("Content-Type", "text/plain")
        Res.end("Unacceptable!");
    }
});

SERVER.listen(PORT, () => {
    console.log("OK");
});