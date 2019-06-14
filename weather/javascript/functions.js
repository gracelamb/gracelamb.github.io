/* *************************************
*  Weather Site JavaScript Functions
************************************* */


// Variables for Function Use
const temp = 31;
const speed = 5;
buildWC(speed, temp);
const direction = "NNE"; //Set your own value
windDial(direction);
let forecast = "wet";
getCondition(forecast);
let condition = getCondition(forecast);
changeSummaryImage(condition);
let value = 45.89;
convertMeters(value);

// Wind Chill Function
function buildWC(speed, temp){
    const feelTemp = document.getElementById('feelsLikeTemp');

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
    feelsLikeTemp.innerHTML = wc;
}

// Wind Pointer Function
function windDial(direction){

    // Get the wind dial container
    const dial = document.getElementById("compass");
    console.log(direction);

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
    if(forecast.includes("clear") || forecast.includes("sun")){
        condition = "clear";
        console.log(condition);
        return condition;
    }
    else if(forecast.includes("cloud") || forecast.includes("overcast")){
        condition = "clouds";
        console.log(condition);
        return condition;
    }
    else if(forecast.includes("fog")){
        condition = "fog";
        console.log(condition);
        return condition;
    }
    else if(forecast.includes("rain") || forecast.includes("wet") || forecast.includes("precipitation")){
        condition = "rain";
        console.log(condition);
        return condition;
    }
    else if(forecast.includes("snow") || forecast.includes("flurry")){
        condition = "snow";
        console.log(condition);
        return condition;
    }

    
    
}

// Change Summary Image Function
function changeSummaryImage(condition){

    // Get the background container
    const image = document.getElementById("weatherLook");
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
    const newVal = Math.round(value * 3.28);
    return newVal;

}


// string literal: console.log(`raw windchill is: ${wc}`)