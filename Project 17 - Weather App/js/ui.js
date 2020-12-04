class UI{
    constructor(){
        this.weatherCard_div = document.querySelector('.app__card');
        this.weatherLocation_span = document.querySelector('.weather-location');
    }

    populateUISuccess(data){
        this.weatherCard_div.innerHTML = `
        <div class="app__card-header">
            <img src="${this.isDayTime(data).imageSrc}" alt="Card Background Image" class="card-image">
            <span class="weather-location ${this.isDayTime(data).dayThemeClass}">${data.name}, ${data.sys.country}</span>
        </div>
        <div class="app__card-content">
            <span class="current-temp">${this.convertToCelsius(data.main.temp)}&deg;C</span>
            <div class="temperature-info">
                <h2 class="heading-two">${data.weather[0].main}</h2>
                <span class="max-temp">
                    <i class="fas fa-long-arrow-alt-up"></i>
                    ${this.convertToCelsius(data.main.temp_max)}&deg;C
                </span>
                <span class="min-temp">
                    <i class="fas fa-long-arrow-alt-down"></i>
                    ${this.convertToCelsius(data.main.temp_min)}&deg;C
                </span>
            </div>
            <div class="weather-icon">
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}">
            </div>
            <div class="weather-feels-like">
                <span class="feels-like-temp">${this.convertToCelsius(data.main.feels_like)}&deg;C</span>
                <small class="feels-like-label">Feels Like</small>
            </div>
            <div class="weather-humidity">
                <span class="humidity-level">${data.main.humidity}%</span>
                <small class="humidity-label">Humidity</small>
            </div>
        </div>
        `
    }

    populateUIFail(message){
        this.weatherCard_div.innerHTML = `
            <div class="error-div">
                <h2 class="heading-two">${message}</h2>
            </div>
        `
    }

    isDayTime(data) {
        let imageSrc, dayThemeClass;

        if(data.weather[0].icon.includes('d')){
            imageSrc = 'images/day_image.svg';
            dayThemeClass = '';
        } else {
            imageSrc = 'images/night_image.svg';
            dayThemeClass = 'day-theme';
        }
        return { imageSrc, dayThemeClass };
    }

    convertToCelsius(degrees){
        return Math.round(degrees - 273.15);
    }
}

export default UI;