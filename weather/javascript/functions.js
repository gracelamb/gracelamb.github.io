/* *************************************
*  Weather Site JavaScript Functions
************************************* */


// Variables for Function Use
// let temp = 31;
// let speed = 5;
// buildWC(speed, temp);
// let direction = "NNE"; //Set your own value
// windDial(direction);
// let forecast = "wet";
// getCondition(forecast);
// let condition = getCondition(forecast);
// changeSummaryImage(condition);
// let value = document.getElementById("elevation");
// convertMeters(value);

// Wind Chill Function
function buildWC(speed, temp){

    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 
    0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;

    // Display the windchill
    console.log(wc);
    return wc;
}

// Wind Pointer Function
function windDial(direction){

    // Get the wind dial container
    let dial = document.getElementById("compass");
    console.log(direction);
// convert to number
    // Determine the dial class
    switch (direction){
        case "North":
        case "N":
         dial.setAttribute("class", "n"); //"n" is the CSS rule selector
         break;
        case "NE":
        case "NNE":
        case "ENE":
         dial.setAttribute("class", "ne");
         break;
        case "NW":
        case "NNW":
        case "WNW":
         dial.setAttribute("class", "nw");
         break;
        case "South":
        case "S":
         dial.setAttribute("class", "s");
         break;
        case "SE":
        case "SSE":
        case "ESE":
         dial.setAttribute("class", "se");
         break;
        case "SW":
        case "SSW":
        case "WSW":
         dial.setAttribute("class", "sw");
         break;
        case "East":
        case "E":
         dial.setAttribute("class", "e");
         break;
        case "West":
        case "W":
         dial.setAttribute("class", "w");
         break;
       }
}

// Get Condition Function
function getCondition(forecast){

    //Declare return variable
    let condition = ""
    console.log(forecast);

    // Determine the condition
    if(forecast.includes("Clear") || forecast.includes("Cun")){
        condition = "clear";
        console.log(condition);
        changeSummaryImage(condition);
    }
    else if(forecast.includes("Cloud") || forecast.includes("Overcast")){
        condition = "clouds";
        console.log(condition);
        changeSummaryImage(condition);
    }
    else if(forecast.includes("Fog")){
        condition = "fog";
        console.log(condition);
        changeSummaryImage(condition);
    }
    else if(forecast.includes("Rain") || forecast.includes("Wet") || forecast.includes("Precipitation")|| forecast.includes("Storm")){
        condition = "rain";
        console.log(condition);
        changeSummaryImage(condition);
    }
    else if(forecast.includes("Snow") || forecast.includes("Flurry")){
        condition = "snow";
        console.log(condition);
        changeSummaryImage(condition);
    }

    console.log(condition); 
}

// Change Summary Image Function
function changeSummaryImage(condition){

    // Get the background container
    let image = document.getElementById("weatherLook");
    console.log(image);
    console.log(condition)

    // Determine the background image
    switch(condition){
        case "clear":
            weatherLook.setAttribute("class", "clear");
            break;
        case "clouds":
            weatherLook.setAttribute("class", "clouds");
            break;
        case "fog":
            weatherLook.setAttribute("class", "fog");
            break;
        case "rain":
            weatherLook.setAttribute("class", "rain");
            break;
        case "snow":
            weatherLook.setAttribute("class", "snow");
            break;
    }
    console.log(condition);
}

// Convert to meters function
function convertMeters(value){

    // Convert meters to feet
    let newVal = Math.round(value * 3.28);
    console.log(newVal);
    document.getElementById("elevation").innerHTML = newVal;

}


// Convert, Format time to 12 hour format
function format_time(hour) {
    if(hour > 23){ 
        hour -= 24; 
       } 
       let amPM = (hour > 11) ? "pm" : "am"; 
       if(hour > 12) { 
        hour -= 12; 
       } 
       if(hour == 0) { 
        hour = "12"; 
       } 
       return hour + amPM;
}

// Get the next hour based on the current time
let date = new Date(); 
let nextHour = date.getHours() + 1;

// Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }

// these functions will work together to get weather info for the current location 
// and populate a web page with the data
'use strict';

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - youremailhere@byui.edu"
    }
  };

let storage = localStorage;
buildPage(storage);

// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
        

      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      // Call the function to get the list of weather stations
      getStationId(stationsURL); 

    // Find more info with more url's and more functions
    getHourly(data.properties.forecastHourly);
    getForecast(data.properties.forecast);
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 

} // end getLocation function


// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
} // end getStationId function


// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
      storage.setItem("stationTemp", data.properties.temperature.value);
      storage.setItem("stationSummary", data.properties.textDescription);
      storage.setItem("stationWindSpeed", data.properties.windSpeed.value);
      storage.setItem("stationLat", data.geometry.coordinates[0]);
      storage.setItem("stationLong", data.geometry.coordinates[1]);
      
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
} // end getWeather function

// Get the current hourly conditions
function getHourly(hourlyURL){ 
     fetch(hourlyURL, idHeader)
     .then(function (response) {
         if (response.ok) {
             return response.json();
         }
         throw new ERROR('Response not OK.');
     })
     .then(function (data) {
         // Let's see what we got back
         console.log('From getHourly function:');
         console.log(data);
         // Store weather information to localStorage 
         let hourlyTemps = [];

            for (let i = 0; i < 13; i++) {
                hourlyTemps[i] = data.properties.periods[i].temperature;
            }
            console.log(hourlyTemps);
            let hourdata = buildHourlyData(nextHour, hourlyTemps);
            storage.setItem('hourlyTemps', hourdata);
        })
        .catch(error => console.log('There was a getHourly error: ', error))
} // end getHourly function

// Populate the current location weather page
function buildPage(localStorage){
    // Let's see what we got back
    console.log("From buildPage Function:");
    // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
    let wc = buildWC(storage.getItem("stationWindSpeed"),storage.getItem("stationTemp"));
    getCondition(storage.getItem("stationSummary"));
    convertMeters(storage.getItem("stationElevation"));
    windDial(storage.getItem("stationDirect"));
    // dial
    // hourly temps

    // Task 2 - Populate location information
    document.getElementById("zip").innerHTML = "Unavailable";
    document.getElementById("latitude").innerHTML = storage.getItem("stationLat");
    document.getElementById("longitude").innerHTML = storage.getItem("stationLong");
    document.getElementById("locationTitle").innerHTML = storage.getItem("locName") + ", " + 
        storage.getItem("locState");
    document.getElementById("title").innerHTML = storage.getItem("locName") + ", " + 
        storage.getItem("locState") + " | Weather Site";

    // Task 3 - Populate weather information
    document.getElementById("currentTemp").innerHTML = convertFahrenheit(Math.floor(storage.getItem("stationTemp")));
    document.getElementById("forecastValues").innerHTML = storage.getItem("hourlyTemps");
    document.getElementById("feelsLikeTemp").innerHTML = convertFahrenheit(wc);
    document.getElementById("clear").innerHTML = storage.getItem("stationSummary");
    document.getElementById("mph").innerHTML = convertMPH(storage.getItem("stationWindSpeed")) + " mph";
    document.getElementById("highTemp").innerHTML = storage.getItem("stationHigh") + "&deg;F";
    document.getElementById("lowTemp").innerHTML = storage.getItem("stationLow") + "&deg;F";
    document.getElementById("dValue").innerHTML = storage.getItem("stationDirect");
    document.getElementById("gValue").innerHTML = storage.getItem("stationGusts");
    document.getElementById("details").innerHTML = storage.getItem("details");
    document.getElementById("icon").innerHTML = "<img src = '" + storage.getItem("stationIcon") + "' />"

    // Task 4 - Hide status and show main
    document.getElementById('main').setAttribute("class", '');
    document.getElementById('status').setAttribute("class", "hide");
   }
// end buildPage function

// Convert celsius into fahrenheit
function convertFahrenheit(temp) {
    let fahr = Math.floor((temp * (9/5)) + 32);
    return fahr;
}
// end convertFahrenheit function

// Convert mps to mph
function convertMPH(speed){
    let mph = Math.floor(speed * 2.237);
    return mph;
}
// end convertMPH function

// Get more info from the forecast URL
function getForecast(forecastURL){
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(forecastURL, idHeader) 
        .then(function(response){
          if(response.ok){ 
           return response.json(); 
          } 
        throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
    // Let's see what we got back
        console.log('From getForecast function:'); 
        console.log(data);

    // Store weather info to local storage
    storage.setItem("stationHigh", data.properties.periods["0"].temperature);
    storage.setItem("stationLow", data.properties.periods["1"].temperature);
    storage.setItem("stationDirect", data.properties.periods["0"].windDirection);
    storage.setItem("stationIcon", data.properties.periods["0"].icon);
    storage.setItem("stationGusts", data.properties.periods["0"].windSpeed);
    storage.setItem("details", data.properties.periods["0"].detailedForecast);
})}


// use forecast url 

// string literal: console.log(`raw windchill is: ${wc}`)

// Fetch API - Structure 
// 
// fetch(URL)
//  .then(function(response) {
//    if(response.ok){
//      return response.json();
//    }
//    throw new ERROR('Network response was not OK.');
//  })
//  .then(function(data){
//    ... do something with the JavaScript object ...
//  })
//  .catch(function(error){
// console.log('There was a fetch problem: ', error.message);
//  })