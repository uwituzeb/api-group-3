const inputBox = document.querySelector('.input-box');
const searchButton = document.getElementById('searchButton');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');
const body = document.querySelector('body');

async function getWeatherData(city) {
    const api = '8743a919f595a49c75d5dd981115a68a';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    const response = await fetch(URL);
    const weatherData = await response.json();

    if (response.ok) {
        locationNotFound.style.display = "none";
        weatherBody.style.display = "block";
        temperature.textContent = `${Math.round(weatherData.main.temp - 273.15)} °C`;
        description.textContent = `${weatherData.weather[0].description}`;

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImg.src = "images/cloud.png";
                setBodyBackground('cloudy');
                break;
            case 'Clear':
                weatherImg.src = "images/sun.png";
                setBodyBackground('sunny');
                break;
            case 'Snow':
                weatherImg.src = "images/snow.png";
                setBodyBackground('snowy');
                break;
            case 'Rain':
                weatherImg.src = "images/Rain.jpg";
                setBodyBackground('rainy');
                break;
        }
    } else if (weatherData.cod === '404') {
        // Handle '404' response by showing an error message and setting a background image
        locationNotFound.style.display = "block";
        weatherBody.style.display = "none";
        setBodyBackground('not-found');
    } else {
        // Handle other HTTP status codes (e.g., 403, 500) with a generic error message
        displayErrorMessage('Error fetching weather data');
    }
}

function displayErrorMessage(message) {
    locationNotFound.style.display = "block";
    weatherBody.style.display = "none";
    locationNotFound.textContent = message;
}

function setBodyBackground(condition) {
    // Adjust the image URLs based on your actual image files
    switch (condition) {
        case 'sunny':
            body.style.backgroundImage = "url('images/sunny.jpg')";
            body.style.backgroundSize = "cover";
            break;
        case 'cloudy':
            body.style.backgroundImage = "url('images/cloud.jpg')";
            body.style.backgroundSize = "cover";
            break;
        case 'snowy':
            body.style.backgroundImage = "url('images/snow.jpg')";
            body.style.backgroundSize = "cover";
            break;
        case 'rainy':
            body.style.backgroundImage = "url('images/Rain.jpg')";
            body.style.backgroundSize = "cover";
            break;
        case 'not-found':
            body.style.backgroundImage = "url('images/not-found.jpg')";
            body.style.backgroundSize = "cover";
            break;
        default:
            body.style.backgroundImage = "url('images/default-background.jpg')";
    }
}

searchButton.addEventListener('click', () => {
    getWeatherData(inputBox.value);
});
