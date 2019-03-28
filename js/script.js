var button = document.querySelector("button");

button.addEventListener("click", apiQuery);
window.addEventListener("keydown", enterKey);

function enterKey(e) {
  
  if(e.keyCode === 13) {
    
     document.querySelector("input").blur(); 
     apiQuery();
    
  } else {
    
    return;
  }
}

function apiQuery() {
  
  var place = document.querySelector("input").value;
  var query = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=d54a7dcc244b2e97f8abaa82d976ff44&units=metric";
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", query, true);
  xhr.send();
  xhr.onload = queryResult;

}

function queryResult() {
  
  if(this.status === 200) {
    
    var result = JSON.parse(this.responseText);
    displayResult(result);
      
  } else {
    alert("Location not found");
  }
}

function displayResult(result) {
  
  var overall = result.weather[0].description;
  var place = result.name;
  var country = result.sys.country;
  var temp = result.main.temp;
  var humidity = result.main.humidity;
  var wind = result.wind.speed;
  var cloud = result.clouds.all;
  
  //background gradient based on the temperature
  var background = document.querySelector("body");
  
  if (temp < 5) { //snow
    
    background.style.background = "linear-gradient( 111.5deg,  rgba(242,246,254,1) 0.3%, rgba(227,233,252,1) 99.1% )";
   
  } else if (temp >=5 && temp < 10) { //cold
  
     background.style.background = "linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)";
    
  } else if (temp >=10 && temp < 15) { //cool
  
     background.style.background = "linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%)";
    
  } else if (temp >=15 && temp < 20) { //bright
  
     background.style.background = "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
    
  } else if (temp >=20 && temp < 30) { //average
  
     background.style.background = "linear-gradient( 109.6deg,  rgba(255,194,48,1) 11.2%, rgba(255,124,0,1) 100.2% )";
    
  } else { //hot
  
    background.style.background = "linear-gradient( 96.1deg,  rgba(229,73,73,1) 10.8%, rgba(246,113,113,1) 107.8% )";

}
  
  //Display result
  document.querySelector(".overall").innerHTML = overall;
  document.querySelector(".place").innerHTML = place;
  document.querySelector(".country").innerHTML = country;
  document.querySelector(".temp").innerHTML = temp + "<span>&deg;</span>";
  document.querySelector(".humidity").innerHTML = humidity;
  document.querySelector(".wind").innerHTML = wind;
  document.querySelector(".cloud").innerHTML = cloud;

}