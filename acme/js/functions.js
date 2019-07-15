'use strict;'
console.log("My JavaScript is being read.")
getData();

// getData function
function getData(){
  let URL = "/acme/js/acme.json"

  // Get the data from the Json file
  fetch(URL) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    console.log(data);
    console.log(Object.keys(data));
    let products = Object.keys(data);
    document.getElementById('nav-list').innerHTML += buildNav(products);
})}


// buildNav funcion
function buildNav(array){
  let items = '<li><a href="#">Home</a></li>';
  for (let i = 0, x = array.length; i < x; i++){
      items += '<li><a href="#">' + array[i] + '</a></li>'
     }
     console.log(items);
     return items;
}