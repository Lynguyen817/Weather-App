let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let TwentyFourHour = now.getHours();
let mid = "pm";
if (hours > 12) {
  hours = hours - 12;
}
if (hours === 0){
  hours = 12;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (TwentyFourHour < 12){
  mid = "am";
}
let h4 = document.querySelector("h4");
h4.innerHTML = `${day},${month} ${date}, ${year} <br/> ${hours} : ${minutes} ${mid}`;




//Search temperature
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchInput.innerHTML = `${searchInput.value}`;
  let cityInput = document.querySelector("#cityname");
  cityInput.innerHTML = `${searchInput.value}`;
  let apiKey = "8a8052e8868f50698a39b01529899d81";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  function showTemperature(response) {
    document.querySelector("#cityname").innerHTML = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    document.querySelector("#degree").innerHTML = temperature;
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    function changeToC (event){
      event.preventDefault();
      document.querySelector("#degree").innerHTML = temperature;
    }
    let switchToCelcius = document.querySelector("#Clink");
     switchToCelcius.addEventListener("click", changeToC);
    function changeToF (event){
      event.preventDefault();
      let FahTemperature = document.querySelector("#degree");
      FahTemperature.innerHTML = Math.round((temperature*9/5) + 32);
    }
      let switchToFahrenheit = document.querySelector("#Flink");
      switchToFahrenheit.addEventListener("click", changeToF);
  }
  function changeHumidity(response) {
    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity : ${humidity} %`;
  }
  function changeWind(response) {
    let wind = response.data.wind.speed;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind : ${wind} m/s`;
  }
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(changeHumidity);
  axios.get(apiUrl).then(changeWind);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Current button
function showLocation(event) {
  event.preventDefault();
  function showTemperatureLocation(response) {
    let localTemperature = Math.round(response.data.main.temp);
    let localDegree = document.querySelector("#degree");
    localDegree.innerHTML = localTemperature;
    let localCity = document.querySelector("#cityname");
    localCity.innerHTML = response.data.name;
  }
  function currentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "8a8052e8868f50698a39b01529899d81";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperatureLocation);
  }
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentTemperature = document.querySelector("#current");
currentTemperature.addEventListener("click", showLocation);
