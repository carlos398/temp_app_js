const API_KEY = '025bb190dafd84281856322c8afdc3d0';

const fetchData = position => {
    const latitud = position.coords.latitude
    const longitude = position.coords.longitude
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitud}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))

};

const setWeatherData = data => {
    const waterData = {
        date: getDate(),
        location: data.name,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
    };

    Object.keys(waterData).forEach(key => {
        document.getElementById(key).textContent = waterData[key]
    });

    clearUp();
};

const clearUp = () => {
    let container = document.getElementById('container')
    let loader = document.getElementById('loader')

    loader.style.display = 'none'
    container.style.display = 'flex'
}

const getDate = () => {
    let date = new Date()
    return `${date.getDate()} - ${('0' + (date.getMonth() + 1)).slice(-2)} - ${date.getFullYear()}`
}

document.addEventListener("DOMContentLoaded", () => {
    navigator.geolocation.getCurrentPosition(fetchData)
});