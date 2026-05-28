class WeatherApp {
    constructor() {
        this.API_KEY = API_KEY;
        this.API_URL = "https://api.openweathermap.org/data/2.5/weather";
    }

    async getWeather(city) {
        const loading  = document.querySelector("#loading");
        const errorMsg = document.querySelector("#errorMsg");
        const card     = document.querySelector("#weatherCard");

        loading.style.display  = "block";
        errorMsg.style.display = "none";
        card.style.display     = "none";

        try {
            const res  = await fetch(`${this.API_URL}?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`);
            const data = await res.json();
            if (data.cod !== 200) throw new Error(data.message || "City not found");
            this.displayWeather(data);
        } catch (err) {
            errorMsg.textContent   = err.message.charAt(0).toUpperCase() + err.message.slice(1);
            errorMsg.style.display = "block";
        } finally {
            loading.style.display = "none";
        }
    }

    displayWeather(d) {
        document.querySelector("#cityName").textContent    = `${d.name}, ${d.sys.country}`;
        document.querySelector("#description").textContent = d.weather[0].description;
        document.querySelector("#temperature").textContent = `${d.main.temp.toFixed(1)} °C`;
        document.querySelector("#humidity").textContent    = `${d.main.humidity}%`;
        document.querySelector("#windSpeed").textContent   = `${d.wind.speed.toFixed(1)} m/s`;
        document.querySelector("#pressure").textContent    = `${d.main.pressure} hPa`;
        document.querySelector("#weatherCard").style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new WeatherApp();

    document.querySelector("#searchBtn").addEventListener("click", () => {
        const city = document.querySelector("#cityInput").value.trim();
        if (city) app.getWeather(city);
    });

    document.querySelector("#cityInput").addEventListener("keydown", e => {
        if (e.key === "Enter") {
            const city = e.target.value.trim();
            if (city) app.getWeather(city);
        }
    });
});