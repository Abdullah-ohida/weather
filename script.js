const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode === 13) {
        getResult(searchBox.value);
    };
}

const api = {
    key: "310512ea6b5adad8650d365563d9c980",
    base: 'http://api.weatherstack.com/',
}

let currenttate = "lagos";

window.addEventListener("DOMContentLoaded", function(){
    getResult(currenttate)
    // displayResults(currentstate)
})





function getResult(query) {
    fetch(`${api.base}current?access_key=${api.key}& query=${query}`)
        .then((weather) => {
            return weather.json();
        }).then(displayResults);
};

function displayResults(weather){
   let city = document.querySelector('.city');
    console.log(weather)
    city.textContent = `${weather.location.name}. ${weather.location.country}`;
    
    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.current.temperature)}<span>&#8451</span>`;

    let weatherDes = document.querySelector('.weather');
    weatherDes.textContent = `${weather.current.weather_descriptions}`

    const weatherImg = document.getElementById('icon');
     weatherImg.src = `${weather.current.weather_icons}`
     searchBox.value = "";
};

let now = new Date();
let date = document.querySelector('.date');
date.textContent = dateBulder(now)

function dateBulder(value){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[value.getDay()];
    let date = value.getDate();
    let month = months[value.getMonth()];
    let year = value.getFullYear();

    return `${day} ${date} ${month} ${year}`
}