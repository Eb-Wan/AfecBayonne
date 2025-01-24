const FS = require("fs");
const HTTP = require("http");
const AXIOS = require("axios");
const PORT = 3000;


let TestData = JSON.stringify({
    Name: "Pignouf",
    Age: 69,
    Address: "123 Rue Principale - Bourgpaumé",
    CurrentDate: "2025-01-03"
});

const SERVER = HTTP.createServer(Request);
SERVER.listen(PORT, () => {
    console.log("Running");
});

async function Request(Req, Res) {
    if (Req.url === "/") {
        Res.writeHead(200, {"Content-Type": "text/html"});
        Res.end(`<script>window.location.replace("accueil")</script>`);
    }
    else if (Req.url.toLowerCase() === "/accueil") {
        Res.writeHead(200, {"Content-Type": "text/html"});
        Result = await ReadFile("FrontEnd/Accueil.html")
        if (Result == null) Result = "Well, thats not very good. How embarrassing.";

        Res.end(Result);
    } else if (Req.url === "/meteo") {
        const WeatherData = await GetWeatherData();
        Res.writeHead(200, {"Content-Type": "text/html"});
        Res.end(`<h1>The Weather at ${WeatherData.name}</h1><br><br><p></p>The temperature is ${WeatherData.main.temp} celsius and there is ${WeatherData.weather[0].description}. The humidity is at ${WeatherData.main.humidity}%.`);
    }
    else if (Req.url.toLowerCase() === "/a-propos") {
        Res.writeHead(200, {"Content-Type": "text/html"});
        Result = await ReadFile("BackEnd/Json/TestJson.json")
        if (Result == null) Res.end("Well, thats not very good. How embarrassing.");
        else {
            Result = JSON.parse(Result);
            Res.end(`<h1>About</h1> <p>My name is ${Result.Name}<br>I am ${Result.Age}</p>`);
        }
    }
    else if (Req.url.toLowerCase() === "/contact") {
        Res.writeHead(200, {"Content-Type": "text/html"});
        Result = await ReadFile("BackEnd/Json/TestJson.json")
        if (Result == null) Res.end("Well, thats not very good. How embarrassing.");
        else {
            Result = JSON.parse(Result);
            Res.end(`<h1>About</h1><p>Address ${Result.Address}`);
        }
    }
    else {
        Res.writeHead(404, {"Content-Type": "text/plain"});
        Res.end("Unacceptable!");
    }
}

async function GetWeatherData() {
    const Lat = 43.709999;
    const Lon = -1.050000;
  
    const API_KEY = "";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=${API_KEY}&units=metric`;

    try {
        const Response = await AXIOS.get(API_URL);
        return Response.data;
    } catch (Error) {
        console.error("Error fetching weather data:", Error.response ? Error.response.data : Error.message);
    }
}

async function TestReadWrite() {
    const FilePath = "BackEnd/Json/TestJson.json";
    let Result = await WriteFile(FilePath, TestData);
    if (Result) Result = await ReadFile(FilePath);
    if (Result == null) Result = "Well, thats not very good. How embarrassing.";
    console.log(JSON.parse(Result));
}

function ReadFile(Path) {
    return new Promise((Res, Rej) => {
        FS.readFile(Path, "utf8", (Error, Data) => {
            if (Error) {
                console.error(Error);
                Rej(null);
            }
            Res(Data);
        });
    });
}
function WriteFile(Path, Data) {
    return new Promise((Res, Rej) => {
        FS.writeFile(Path, Data, (Error) => {
            if (Error) {
                console.error(Error);
                Rej(null);
            }
            Res(true);
        });
    });
}
