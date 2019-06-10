/* *************************************
*  Weather Site JavaScript Functions
************************************* */


// Variables for Function Use
const temp = 31;
const speed = 5;
buildWC(speed, temp);

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




