const inputBox = document.querySelector('.input-box');
const searchButton = document.getElementById('searchButton');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');

async function getWeatherData(city) {
    const api = '8743a919f595a49c75d5dd981115a68a';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    const weatherData = await fetch(URL).then (response => response.json());

    const locationNotFound = document.querySelector('.location-not-found');
    const weatherBody = document.querySelector('.weather-body');
    if (weatherData.cod === '404') {
        locationNotFound.style.display = "block";
        weatherBody.style.display = "none";
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "block";
    temperature.textContent = `${Math.round(weatherData.main.temp - 273.15)} °C`;
    description.textContent = `${weatherData.weather[0].description}`;

    switch(weatherData.weather[0].main){
        case 'Clouds':
            weatherImg.src = "images/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "images/sun.png";
            break;
        case 'Snow':
            weatherImg.src = "images/snow.png";
            break;
        case 'Rain':
            weatherImg.src = "images/rain.png";
            break;
    }
}  


searchButton.addEventListener('click', () => {
    getWeatherData(inputBox.value);
})