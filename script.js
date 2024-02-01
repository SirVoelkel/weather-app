const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    
    const APIKey = '856a68e33a6ae000b3f85a988b4ad20a';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '640px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityHide.textContent == city) {
            return;
        } else {
            cityHide.textContent = city;
        }

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'assets/clear.jpeg';    
                break;
        
            case 'Rain':
                image.src = 'assets/rain.jpeg';    
                break;
                
            case 'Snow':
                image.src = 'assets/snow.jpeg';    
                break;

            case 'Clouds':
                image.src = 'assets/cloud.jpeg';    
                break;

            case 'Mist':
                image.src = 'assets/mist.jpeg';    
                break;    
                
            case 'Haze':
                image.src = 'assets/mist.jpeg';    
                break;    

            default:
                image.src = 'assets/cloud.jpeg';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        

    });    

});