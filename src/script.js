//display date
function getTodaysDate(newdate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thirsday",
    "Friday",
    "Saturday",
  ];

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
    "December",
  ];

  let weekday = days[newdate.getDay()];
  let month = months[newdate.getMonth()];
  let date = newdate.getDate();
  let hours = newdate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = newdate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  let todaysDate = `${month} ${date}, ${time}`;

  return todaysDate;
}
let newdate = new Date();
let currentDate = document.querySelector("#date");
currentDate.innerHTML = getTodaysDate(newdate);

//default city on load
function search(city) {
  let apiKey = "e318d3f2a9a825ffebe8387cd885ce61";
  /*et url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${apiKey}}`;*/
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(showWeather);
}

//get city from input
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput").value;
  search(cityInput);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

//show weather

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#city-temp").innerHTML = `${temperature}`;

  celciusTemp = temperature;

  let description = response.data.weather[0].description;
  document.querySelector("#weather-description").innerHTML = `${description}`;

  let highTemperature = Math.round(response.data.main.temp_max);
  document.querySelector("#high-temp").innerHTML = `${highTemperature}°C`;

  let lowTemperature = Math.round(response.data.main.temp_min);
  document.querySelector("#low-temp").innerHTML = `${lowTemperature}°C`;

  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind-speed").innerHTML = `${wind}`;

  let rain = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `${rain}%`;

  let sunriseTime = response.data.sys.sunrise;

  function getSunriseTime() {
    let time = new Date(sunriseTime * 1000);
    let sunrisehour = time.getHours();
    if (sunrisehour < 10) {
      sunrisehour = `0${sunrisehour}`;
    }
    let sunriseminutes = time.getMinutes();
    if (sunriseminutes < 10) {
      sunriseminutes = `0${sunriseminutes}`;
    }
    let formattedsunriseTime = `${sunrisehour}:${sunriseminutes}`;
    return formattedsunriseTime;
  }

  document.querySelector("#sunrise").innerHTML = getSunriseTime(sunriseTime);

  let sunsetTime = response.data.sys.sunset;

  function getSunsetTime() {
    let time = new Date(sunsetTime * 1000);
    let sunsethour = time.getHours();
    let sunsetminutes = time.getMinutes();
    if (sunsetminutes < 10) {
      sunsetminutes = `0${sunsetminutes}`;
    }
    let formattedsunsetTime = `${sunsethour}:${sunsetminutes}`;
    return formattedsunsetTime;
  }
  document.querySelector("#sunset").innerHTML = getSunsetTime(sunsetTime);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//geolocation weather
function calculatePosition(position) {
  let apiKey = "e318d3f2a9a825ffebe8387cd885ce61";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(calculatePosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);

//convert to Fahrenheit and back
function showCelciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#city-temp").innerHTML = celciusTemp;
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  //remove active class from celsius link
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  document.querySelector("#city-temp").innerHTML = Math.round(fahrenheitTemp);
}

let celciusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", showCelciusTemp);

search("London");
