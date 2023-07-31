const apiKey = "036a6de1887c41d98eb05102232407";

const form = document.querySelector("form");
const search = document.querySelector("#location");

// var lon=0,lat=0;
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   lat=position.coords.latitude;
//   lon= position.coords.longitude;
//   console.log(lat,lon);
// }

const getWeather = async (city) => {
  const urlforecast = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes&alerts=no`;

  const response = await fetch(urlforecast);
  const data = await response.json();
  return data;
};
function showWeather(weatherData) {
  console.log(weatherData);
  document.getElementById("temp_img").src = weatherData.current.condition.icon;
  document.getElementById("temp").innerHTML = weatherData.current.temp_c + "°C";
  document.getElementById("realfeel").innerHTML =
    "Feels Like : " + weatherData.current.feelslike_c + "°C";
  document.getElementById("uv").innerHTML = "UV : " + weatherData.current.uv;
  document.getElementById("condition").innerHTML =
    weatherData.current.condition.text;
  document.getElementById("city").innerHTML =
    "city".innerText = `${weatherData.location.name} , ${weatherData.location.country}`;
  document.getElementById(
    "humidity"
  ).innerHTML = `${weatherData.current.humidity}%`;
  document.getElementById(
    "wind_status"
  ).innerHTML = `${weatherData.current.wind_kph} Km/h`;
  document.getElementById(
    "wind_dir"
  ).innerHTML = `${weatherData.current.wind_dir}`;
  document.getElementById(
    "visibility"
  ).innerHTML = `${weatherData.current.vis_km} KM`;
  localTime(weatherData.location.tz_id);
  switch (weatherData.current.condition.text) {
    case "Haze":
      document.getElementById("img").src = "./image/haze.png";
      break;
    case "Mist":
      document.getElementById("img").src = "./image/mist.jpg";
      break;
    case "Partly cloudy":
      document.getElementById("img").src = "./image/partlycloudy.jpg";
      break;
    case "Light rain":
      document.getElementById("img").src = "./image/rainyday.jpg";
      break;
    case "Rain":
      document.getElementById("img").src = "./image/rainyday.jpg";
      break;
    case "Overcast":
      document.getElementById("img").src = "./image/mist.jpg";
      break;
    case "Moderate or heavy rain with thunder":
      document.getElementById("img").src = "./image/rainyday.jpg";
      break;
  }
  showAqi(weatherData.current);
  const day = weatherData.forecast.forecastday;
  weeklyforecast(day);
  hourlyForecast(day);
}
function weeklyforecast(forecastday) {
  let d = new Date();

  document.getElementById("img1").src = forecastday[0].day.condition.icon;
  document.getElementById("day1").innerHTML =
    forecastday[0].day.avgtemp_c + "°C";

  document.getElementById("img2").src = forecastday[1].day.condition.icon;
  document.getElementById("day2").innerHTML =
    forecastday[1].day.avgtemp_c + "°C";

  document.getElementById("img3").src = forecastday[2].day.condition.icon;
  document.getElementById("day3").innerHTML =
    forecastday[2].day.avgtemp_c + "°C";

  document.getElementById("img4").src = forecastday[3].day.condition.icon;
  document.getElementById("day4").innerHTML =
    forecastday[3].day.avgtemp_c + "°C";

  document.getElementById("img5").src = forecastday[4].day.condition.icon;
  document.getElementById("day5").innerHTML =
    forecastday[4].day.avgtemp_c + "°C";

  document.getElementById("img6").src = forecastday[5].day.condition.icon;
  document.getElementById("day6").innerHTML =
    forecastday[5].day.avgtemp_c + "°C";

  document.getElementById("img7").src = forecastday[6].day.condition.icon;
  document.getElementById("day7").innerHTML =
    forecastday[6].day.avgtemp_c + "°C";

  let day = d.getDay();
  document.getElementById("1").innerHTML = "Today";
  document.getElementById("2").innerHTML = "Tomorrow";
  day += 2;
  for (let i = 3; i <= 7; i++) {
    if (day % 7 == 0) {
      document.getElementById(i).innerHTML = "Sunday";
      day++;
    } else if (day % 7 == 1) {
      document.getElementById(i).innerHTML = "Monday";
      day++;
    } else if (day % 7 == 2) {
      document.getElementById(i).innerHTML = "Tuesday";
      day++;
    } else if (day % 7 == 3) {
      document.getElementById(i).innerHTML = "Wednesday";
      day++;
    } else if (day % 7 == 4) {
      document.getElementById(i).innerHTML = "Thurseday";
      day++;
    } else if (day % 7 == 5) {
      document.getElementById(i).innerHTML = "Friday";
      day++;
    } else {
      document.getElementById(i).innerHTML = "Saturday";
      day++;
    }
  }
}

function hourlyForecast(forecastday) {
  let val = document.getElementById("localtime").innerText;
  if (val.slice(6) == "PM" && val.slice(0, 2) != "12") {
    const j = 12 + parseInt(val.slice(0, 2));
    updateWeather(j + 1, forecastday);
  } else {
    const j = parseInt(val.slice(0, 2));
    updateWeather(j + 1, forecastday);
  }
}
function updateWeather(j, forecastday) {
  let k = 0;
  for (let i = 12; i <= 24; i++) {
    if (j == 24) {
      k++;
      j = j % 24;
    }
    document.getElementById(i).innerHTML =
      forecastday[k].hour[j].time.slice(11);
    document.getElementById(2 * i).src = forecastday[k].hour[j].condition.icon;
    document.getElementById(4 * i).innerText =
      forecastday[k].hour[j].temp_c + "°C";
    j++;
  }
}
function localTime(timezone) {
  let d = new Date();
  const options = {
    timeZone: timezone,
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };
  const localTimeString = d.toLocaleDateString("en-us", options);
  console.log(localTimeString);
  document.getElementById("localtime").innerHTML = localTimeString.slice(11);
  const date =
    localTimeString.slice(2, 5) +
    localTimeString.slice(0, 2) +
    localTimeString.slice(5, 9);
  document.getElementById("date").innerHTML = date;
}
function showAqi(current) {
  document.getElementById("pm2.5").innerHTML =
    "PM2.5 : " + current.air_quality.pm2_5;
  document.getElementById("pm10").innerHTML =
    "PM10 : " + current.air_quality.pm10;
  document.getElementById("co").innerHTML = "CO : " + current.air_quality.co;
  document.getElementById("no2").innerHTML = "NO2 : " + current.air_quality.no2;
  document.getElementById("o3").innerHTML = "O3 : " + current.air_quality.o3;
  document.getElementById("so2").innerHTML = "SO2 : " + current.air_quality.so2;
  const index = current.air_quality["gb-defra-index"];
  console.log(index);
  ele = document.getElementById("index");
  console.log(ele);
  if (index > 0 && index <= 3) {
    ele.innerHTML = "LOW";
    ele.style.color = "green";
  } else if (index >= 4 && index <= 6) {
    ele.innerHTML = "Moderate";
    ele.style.color = "#f6a200";
  } else if (index >= 7 && index <= 9) {
    ele.innerHTML = "High";
    ele.style.color = "#ff3300";
  } else {
    ele.innerHTML = "High";
    ele.style.color = "#730099";
  }
}

function currentWeather() {
  getWeather(search.value).then(showWeather);
}
function weatherReport() {
  getWeather(document.getElementById("city1").value).then(showWeatherReport);
  getWeather(document.getElementById("city2").value).then(showWeatherReport);
}
var count = 8;
var id = 10;
function showWeatherReport(weatherData) {
  const data = weatherData;
  console.log(data);
  document.getElementById(
    id
  ).innerHTML = `${weatherData.location.name} , ${weatherData.location.country}`;
  if (id == 10) {
    id++;
  } else {
    id--;
  }

  for (let i = 0; i < 7; i++) {
    const data = weatherData.forecast.forecastday[i].day;

    const humidity = data.avghumidity + "%";
    const temp = data.avgtemp_c + "°C";
    const Wind = data.maxwind_kph + "Km/h";
    const a = weatherData.forecast.forecastday[i].date;
    const d = a.slice(8) + a.slice(4, 8) + a.slice(0, 4);
    const condition = data.condition.text;
    const rain = data.daily_chance_of_rain + "%";
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    const cell4 = document.createElement("td");
    const cell5 = document.createElement("td");
    const cell6 = document.createElement("td");
    cell1.appendChild(document.createTextNode(d));
    cell2.appendChild(document.createTextNode(temp));
    cell3.appendChild(document.createTextNode(condition));
    cell4.appendChild(document.createTextNode(rain));
    cell5.appendChild(document.createTextNode(humidity));
    cell6.appendChild(document.createTextNode(Wind));
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    row.appendChild(cell6);
    document.getElementById(count).appendChild(row);
  }
  if (count == 8) {
    count++;
  } else {
    count--;
  }
}
