const apiKey = "5e01b4459b429693bca7b046472a3c4e";
const lat = 41.1821; // Matosinhos
const lon = -8.6893;

async function getWeather() {

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt`
    );
    const weatherData = await weatherResponse.json();

    document.getElementById("temp").innerText =
        Math.round(weatherData.main.temp) + " °C";

    document.getElementById("wind").innerText =
        Math.round(weatherData.wind.speed * 3.6) + " km/h";

    document.getElementById("windDir").innerText =
        "Direção: " + weatherData.wind.deg + "°";

    document.getElementById("weather").innerText =
        weatherData.weather[0].description;

    updateTimestamp();
}

async function getAirQuality() {

    const airResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const airData = await airResponse.json();

    const aqi = airData.list[0].main.aqi;

    const aqiText = {
        1: "Boa",
        2: "Razoável",
        3: "Moderada",
        4: "Fraca",
        5: "Muito Fraca"
    };

    const aqiCard = document.getElementById("aqiCard");

    aqiCard.classList.remove("good", "moderate", "bad");

    if (aqi <= 2) aqiCard.classList.add("good");
    else if (aqi === 3) aqiCard.classList.add("moderate");
    else aqiCard.classList.add("bad");

    document.getElementById("aqi").innerText =
        aqi + " - " + aqiText[aqi];
}

function updateTimestamp() {
    const now = new Date();
    document.getElementById("lastUpdate").innerText =
        "Atualização: " + now.toLocaleTimeString();
}

function loadData() {
    getWeather();
    getAirQuality();
}

loadData();
setInterval(loadData, 600000); // 10 min
