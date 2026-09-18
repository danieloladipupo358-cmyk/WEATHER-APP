const apiKey = "01eb5198b4ea82cf10072359feade250";

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const weatherIcon = document.getElementById("weatherIcon");

const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(cityName) {

    if (cityName === "") {
        error.style.display = "block";
        error.querySelector("p").textContent = "Please enter a city name.";
        weather.style.display = "none";
        return;
    }

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    );

    if (response.status === 404) {
        error.style.display = "block";
        error.querySelector("p").textContent = "Invalid city name.";
        weather.style.display = "none";
        return;
    }

    if (!response.ok) {
        error.style.display = "block";
        error.querySelector("p").textContent = "Something went wrong.";
        weather.style.display = "none";
        return;
    }

    const data = await response.json();

    temperature.textContent = Math.round(data.main.temp) + "°C";
    city.textContent = data.name;
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = data.wind.speed + " km/h";

    const weatherType = data.weather[0].main;

    if (weatherType === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (weatherType === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (weatherType === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (weatherType === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (weatherType === "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (weatherType === "Snow") {
        weatherIcon.src = "images/snow.png";
    } else {
        weatherIcon.src = "images/clear.png";
    }

    error.style.display = "none";
    weather.style.display = "block";
}

searchButton.addEventListener("click", () => {
    checkWeather(cityInput.value.trim());
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(cityInput.value.trim());
    }
});