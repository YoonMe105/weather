let input = document.querySelector('#search');
let searchbtn = document.querySelector('.search-btn');
let currentbtn = document.querySelector('.current-btn');

let city = document.querySelector('.city');
let condition = document.querySelector('.condition')
let temperature = document.querySelector('.temperature');

let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');

let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&units=metric`;


function showtemperature(response) {
    console.log(response.data);

    city.innerHTML = response.data.name;

    let tem = Math.round(response.data.main.temp);
    temperature.innerHTML = tem;

    condition.innerHTML = response.data.weather[0].main;

    let speed = Math.round(response.data.wind.speed);
    wind.innerHTML = speed;

    humidity.innerHTML = response.data.main.humidity;

}

axios.get(apiUrl).then(showtemperature);

function changetemperature(e) {
    let inputcity = input.value;
    // console.log(inputcity);

    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputcity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showtemperature);

    input.value = "";

    e.preventDefault();
}

searchbtn.addEventListener('click', changetemperature);

function showposition(position) {

    let lati = position.coords.latitude;
    let longi = position.coords.longitude;

    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showtemperature);

}

function changecurrent(e) {

    navigator.geolocation.getCurrentPosition(showposition);

    e.preventDefault();
}

currentbtn.addEventListener('click', changecurrent);
