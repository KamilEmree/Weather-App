const SearchInput = document.getElementById('Cıty-Search');
const SearchButton = document.getElementById('Search-Button');
const CityName = document.getElementById('Weather-Header');
const WeatherMaın = document.getElementById('Weather-Maın');
const WeatherIcon = document.getElementById('Weather-Icon');
const WeatherDegree = document.getElementById('Weather-Degree');
const WindSpeedValue = document.getElementById('WindS-Value');
const FeelsLike = document.getElementById('FeelsL-Value');
const Pressure = document.getElementById('Pressure-Value');
const Humidity = document.getElementById('Humidity-Value');
const WeatherSectıon = document.getElementById('Weather-Sectıon');
const WeatherSectıon2 = document.getElementById('Weather-Sectıon-2');
const WeatherSectıon3 = document.getElementById('Weather-Sectıon-3');
const WeatherHr = document.getElementById('Weather-Hr');
const Location = document.getElementById('Locaiton');
const html = document.querySelector('html');

const Weather = {
  Apı : '&appid=f3d3055201e4c47f428eb4cfdd79db7d',
  Unit : '&units=metric',
  Link : 'https://api.openweathermap.org/data/2.5/weather?q='
}

function RandomBackground () {
  const RandomNumber = Math.floor(Math.random() * 8);
  html.style.backgroundImage = `linear-gradient(to left bottom, 
    rgba(0, 4, 255, 0.356), 
    rgba(255, 0, 0, 0.397)), 
    url(../image/weather-background-${RandomNumber}.jpg)`;
}

function ReturnJson (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open ('GET', url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(xhr.response);
      } else if (this.status === 404){
        resolve(xhr.status)
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    
    xhr.send();

  })
} 

function SearchTheCity () {
  if (SearchInput.value === '' || SearchInput.value.trim() === '') {
    alert('Please Enter City Name!');
    SearchInput.value =  SearchInput.value.trim('')
  } else {
    ReturnJson(`${Weather.Link}${SearchInput.value}${Weather.Unit}${Weather.Apı}`)
    .then(function (response) {  
        if (response === 404) {
          console.clear();
          SearchInput.value = '';          
          alert('Please enter a valid city name!');
          return false;
        }   
        const data = JSON.parse (response);
        const Uppercase = data.weather[0].description.toUpperCase();
        WeatherSectıon.style.display = 'flex';
        WeatherSectıon2.style.display = 'flex';
        WeatherSectıon3.style.display = 'flex';
        Location.style.display = 'block'
        WeatherHr.style.display = 'block';
        CityName.innerText = data.name;
        WeatherMaın.innerText = Uppercase;
        WeatherDegree.innerText = data.main.temp + '°';
        WindSpeedValue.innerText = data.wind.speed + 'km/h';
        FeelsLike.innerText = data.main.feels_like;
        Pressure.innerText = data.main.pressure; 
        Humidity.innerText = data.main.humidity + '%';
        Location.innerText = `Locaiton in ${data.sys.country}`;
        SendIcon(data);
        RandomBackground();
        }).then(function () {
          SearchInput.value = '';
        })
        .catch(function (err) {
          console.log('An error has occurred!', err.statusText);
        })       
    }     
}

function UploadIcon (method,url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}  

function SendIcon (data) {
  UploadIcon('GET','../json/weathericon.json')
  .then(function (response) {
    let Icon = JSON.parse(response);
    if (data.weather[0].icon === '11d' || data.weather[0].icon === '11n') {
      WeatherIcon.innerHTML = Icon.ThunderStorm.ThunderStormAll;
    } else if (data.weather[0].main === 'drizzle') {
      WeatherIcon.innerHTML = Icon.Drizzle.RainAndDrizzleAll;
    } else if (data.weather[0].icon === '10d') {
      WeatherIcon.innerHTML = Icon.Rain.LightModerateVeryHeavyExtremeRainDayTime;
    } else if (data.weather[0].icon === '10n') {
      WeatherIcon.innerHTML = Icon.Rain.LightModerateVeryHeavyExtremeRainNight;
    } else if (data.weather[0].main === 'Snow' && data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
      WeatherIcon.innerHTML = Icon.Snow.LightRainShowerSleetSnowAll;
    } else if (data.weather[0].description === 'freezing rain') {
      WeatherIcon.innerHTML = Icon.Rain.FreezingRain;
    } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n' &&  data.weather[0].description === 'Rain') {
      WeatherIcon.innerHTML = Icon.Rain.LightHeavyRaggedShowerRain;
    } else if (data.weather[0].icon === '50d' || data.weather[0].icon === '50n') {
      WeatherIcon.innerHTML = Icon.Atmosphere.MistAll;
    } else if (data.weather[0].icon === '50d' || data.weather[0].icon === '50d' && data.weather[0].main === 'tornado') {
      WeatherIcon.innerHTML = Icon.Atmosphere.Tornado;
    } else if (data.weather[0].icon === '01d') {
      WeatherIcon.innerHTML = Icon.Clear.ClearSkyDayTime;
    } else if (data.weather[0].icon === '01n') {
      WeatherIcon.innerHTML = Icon.Clear.ClearSkyNight;
    } else if (data.weather[0].icon === '02d') {
      WeatherIcon.innerHTML = Icon.Clouds.FewCloudDayTime;
    } else if (data.weather[0].icon === '02n') {
      WeatherIcon.innerHTML = Icon.Clouds.FewCloudNight;
    } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
      WeatherIcon.innerHTML = Icon.Clouds.ScatteredCloudsAll;
    } else if (data.weather[0].description === 'broken clouds') {
      WeatherIcon.innerHTML = Icon.Clouds.BrokenAndOvercastCloudsAll;
    } else if (data.weather[0].description === 'overcast clouds') {
      WeatherIcon.innerHTML = Icon.Clouds.BrokenAndOvercastCloudsAll;
    } 
  })
  .catch(function (err) {
    console.log('An error has occurred!', err.statusText);
  })
}
