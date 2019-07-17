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
  let items = '<li><a href="/acme/index.html">Home</a></li>';
  for (let i = 0, x = array.length; i < x; i++){
      items += '<li><a href="#">' + array[i] + '</a></li>'
     }
     console.log(items);
     return items;
}

nav.addEventListener("click",function(evt){
  let productName = evt.target.innerHTML;
  console.log(productName);

  let acmeURL = "/acme/js/acme.json"

  // Get the data from the Json file
  fetch(acmeURL) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    console.log(data);

    let p = data[productName];

  // ************ Get and display the content ******************************
  document.getElementById("productName").innerHTML = p.name;
  let path = p.path;
  document.getElementById("pImg").setAttribute("src", p.path);
  document.getElementById("pDescription").innerHTML = p.description;
  document.getElementById("manufacturer").innerHTML = "<b>Made By: </b>" + p.manufacturer;
  document.getElementById("pReviews").innerHTML = "<b>Reviews: </b>" + p.reviews;
  document.getElementById("price").innerHTML = "<b>Price: $" + p.price + "</b>";
  

  // Change the status of the containers
    document.getElementById("products").setAttribute('class', ''); // removes the hide class
    document.getElementById("right").setAttribute('class', ''); // removes the hide class
    document.getElementById("left").setAttribute('class', ''); // removes the hide class
    document.getElementById("home").setAttribute('class', 'hide'); // hides the status container
  
})})