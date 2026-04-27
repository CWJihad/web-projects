document.addEventListener("DOMContentLoaded", () => {
    
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById("weather-info")
    const cityName = document.getElementById("city-name")
    const temperature = document.getElementById("temperature")
    const description = document.getElementById("description")
    const errorMessage = document.getElementById("error-message")

    const API_KEY = '5ff53bc4573c045cffe743d2d1da77f1' // evn variables
    
    getWeatherBtn.addEventListener("click" , async () => {
        const city = cityInput.value.trim();
        if(!city) return;
        
        // it may throw an error
        // server/database is always in another continent

        try {
            await fetchWeatherData(city)
        //    const data = await fetchWeatherData(city)
        //    displayWeatherData(data)

        } catch (error) {
            console.error(error);

        }
        
    })


    async function fetchWeatherData (city) {
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        
        const response = await fetch(url);
        // console.log(typeof response);
        // console.log("RESPONSE", response);

        const data = await response.json()
        console.log("W Data:", data);
        
        if (!response.ok) {
            showError()
        }
        
        else {
            displayWeatherData(data)
        }
        // return data
        
    }

    function displayWeatherData (data) {

        // display
        console.log("displayWeatherData");
        const {name, main, weather} = data;
        cityName.textContent = name
        temperature.textContent = main.temp
        description.textContent = weather[0].description
        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")

    }
    
    function showError () {

        console.log("showError");
        errorMessage.classList.remove('hidden')
        weatherInfo.classList.add("hidden")

    }
    
    
    
    
    
    
    
    
    
    
    
    
    
})