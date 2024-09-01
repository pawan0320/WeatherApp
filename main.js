const api = {
  base: 'https://yahoo-weather5.p.rapidapi.com/weather',
  key: 'bc42fd55b0msh70b8d0c443dad3dp1c19d5jsncddb6f66fb4b',
  host: 'yahoo-weather5.p.rapidapi.com'
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

async function getResults(query) {
  const loader = document.getElementById('loader');
  loader.style.display = 'block'; // Show loader
  
  const url = `${api.base}?location=${query}&format=json&u=f`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': api.key,
      'x-rapidapi-host': api.host
    }
  };

  try {
    const response = await fetch(url, options);
    const weather = await response.json();
    displayResults(weather);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  } finally {
    loader.style.display = 'none'; // Hide loader
  }
}

function displayResults(weather) {
  if (weather.location) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.location.city}, ${weather.location.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.current_observation.condition.temperature)}<span>°F</span>`; // Temperature in Fahrenheit

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.current_observation.condition.text;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${weather.forecasts[0].low}°F / ${weather.forecasts[0].high}°F`;
  } else {
    console.error('Weather data not found');
  }
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
