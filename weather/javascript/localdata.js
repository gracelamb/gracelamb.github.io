"use strict"; 



// Variables for function use.
let pageNav = document.getElementById('nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main');
let weatherURL = "/weather/javascript/weather.json";
fetchData(weatherURL);


// Fetch Function

function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the location specifics
    let latit = g.Latitude;
    let long = g.Longitude;
    let elev = g.Elevation;
    let zip = g.Zip;

    // Get the temperature data
    let highTemp = g.High;
    let lowTemp = g.Low;
    let temp = g.Temp;

    // Get the wind data 
    let windSpeed = g.Wind;
    let windDirect = g.Direction;
    let gusts = g.Gusts;


    // Get the current conditions
    let currentCondition = g.Summary;


    // Get the hourly data 
    let hourlyWeather = g.Hourly

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('locationTitle');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"

    // Set the location specifics
    document.getElementById('latitude').innerHTML = latit;

    document.getElementById('longitude').innerHTML = long;

    document.getElementById('elevation').innerHTML = elev;
    convertMeters(elev);

    document.getElementById('zip').innerHTML = zip;

    // Set the temperature information
    document.getElementById('highTemp').innerHTML = highTemp + "&deg;F";

    document.getElementById('lowTemp').innerHTML = lowTemp + "&deg;F";

    document.getElementById('currentTemp').innerHTML = temp + "&deg;F";

    buildWC(windSpeed, temp);

    // Set the wind information
    document.getElementById('mph').innerHTML = windSpeed + " mph";

    document.getElementById('dValue').innerHTML = windDirect;

    document.getElementById('gValue').innerHTML = gusts;

    windDial(windDirect);

    // Set the current conditions information
    document.getElementById('clear').innerHTML = currentCondition;

    changeSummaryImage(getCondition(currentCondition))


    // Set the hourly temperature information
    let date = new Date(); 
    let nextHour = date.getHours() + 1;
    buildHourlyData(nextHour,hourlyWeather)


    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  status.innerHTML = 'Sorry, the data could not be processed.';
  })
}