// const city = document.getElementById("city");
// const content = document.getElementById("content");

// async function getWeatherData(cityName="Paris") {
  
//     const API_KEY = "c9609abd125b1a6da0539647c5664557";
//     const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

//     try {
//         const res = await fetch(API_URL);
//         if (!res.ok) throw new Error(JSON.stringify(res));
//         const data = await res.json();
        
//         city.textContent = data.name;
//         const hours = new Date(data.dt * 1000).getHours();
//         const minutes = "0" + new Date(data.dt * 1000).getMinutes();
//         content.innerHTML = `
//             <table class="table">
//                 <tr><th>Temperature</th><th>Description</th><th>Humidity</th><th>Local Time</th></tr>
//                 <tr><td>${data.main.temp} C°</td><td>${data.weather[0].description}</td><td>${data.main.humidity}%</td><td>${hours} : ${minutes.substr(-2)}</td></tr>
//             </table>
//         `;
//         ``
//     } catch (Error) {
//         console.error("Error fetching weather data:", Error.response ? Error.response.data : Error.message);
//     }
// }

// document.getElementById("searchForm").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     getWeatherData(formData.get("city"));
// });

//getWeatherData();

    // <div class="modal is-active">
    //     <div class="modal-background"></div>
    //     <div class="modal-card">
    //         <header class="modal-card-head">
    //             <p class="modal-card-title">Weather at <span id="city"></span></p>
    //         </header>
    //         <section id="content" class="modal-card-body">
                
    //         </section>
    //         <footer class="modal-card-foot">
    //             <form id="searchForm" class="columns">
    //                 <input name="city" class="input" type="text" placeholder="Text input" aria-label="Cityname input"/>
    //                 <button type="submit" class="button is-primary">Search</button>
    //             </form>
    //         </footer>
    //     </div>
    // </div>

class WeatherWindow {
    constructor(id) {
        this.id = id;
        this.modal = document.createElement("div");
        this.modal.style = "margin: 16px";

        this.modal.innerHTML = `
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Weather at <span id="city${id}"></span></p>
                </header>
                <section id="content${id}" class="modal-card-body">

                </section>
                <footer class="modal-card-foot">
                    <form id="searchForm${id}" class="columns">
                        <input name="city" class="input" type="text" placeholder="Text input" aria-label="Cityname input"/>
                        <button type="submit" class="button is-primary">Search</button>
                    </form>
                </footer>
            </div>
        `;

        document.querySelector("#weatherContainer").appendChild(this.modal);
        
        this.city = document.getElementById("city"+id);
        this.content = document.getElementById("content"+id);

        document.getElementById("searchForm"+id).addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            this.getWeatherData(formData.get("city"));
        });

        this.getWeatherData();
    }
    async getWeatherData(cityName="Paris") {
  
        const API_KEY = "c9609abd125b1a6da0539647c5664557";
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error(JSON.stringify(res));
            const data = await res.json();
            
            this.city.textContent = data.name;
            const hours = new Date(data.dt * 1000).getHours();
            const minutes = "0" + new Date(data.dt * 1000).getMinutes();
            this.content.innerHTML = `
                <table class="table">
                    <tr><th>Temperature</th><th>Description</th><th>Humidity</th><th>Local Time</th></tr>
                    <tr><td>${data.main.temp} C°</td><td>${data.weather[0].description}</td><td>${data.main.humidity}%</td><td>${hours} : ${minutes.substr(-2)}</td></tr>
                </table>
            `;
            ``
        } catch (Error) {
            console.error("Error fetching weather data:", Error.response ? Error.response.data : Error.message);
        }
    }
}

document.getElementById("createWeather").addEventListener("click", () => {
    weatherInstances.push(new WeatherWindow(weatherInstances.length));
});

let weatherInstances = [];
weatherInstances.push(new WeatherWindow(weatherInstances.length));