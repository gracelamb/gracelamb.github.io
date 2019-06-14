/* *************************************
*  Weather Site JavaScript Functions
************************************* */


// Variables for Function Use
const temp = 31;
const speed = 5;
buildWC(speed, temp);
const direction = "NNE"; //Set your own value
windDial(direction);

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
function getCondition(weather){

    // 


    // Determine the condition
    if(weather == str.includes("clear") || weather == str.includes("sun")){
        condition = "clear";
        return condition;
    }
    else if(weather == str.includes("cloud") || weather == str.includes("overcast")){
        condition = "clouds";
        return condition;
    }
    else if(weather == str.includes("fog")){
        condition = "fog";
        return condition;
    }
    else if(weather == str.includes("rain") || weather == str.includes("wet")){
        condition = "rain";
        return condition;
    }
    else if(weather == str.includes("snow")){
        condition = "snow";
        return condition;
    }
}

// Change Summary Image Function
function changeSummaryImage(condition){

    // Get the background container
    const image = document.getElementById("weatherLook");
    console.log(image);

    // Determine the background image
    switch(image){
        case "clear":
            weatherLook.setAttribute("class", "clear");
        case "clouds":
            weatherLook.setAttribute("class", "clouds");
        case "fog":
            weatherLook.setAttribute("class", "fog");
        case "rain":
            weatherLook.setAttribute("class", "rain");
        case "snow":
            weatherLook.setAttribute("class", "snow");
    }
}

// Convert to meters function
function convertMeters(){

}


// string literal: console.log(`raw windchill is: ${wc}`)