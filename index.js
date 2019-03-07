console.log("hi");


$(document).ready(function(){
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});

let counter
const boroughURL = "http://localhost:3000/boroughs"
const locationsURL = "http://localhost:3000/locations"
const locationContainer = document.querySelector("#locationContainer")
const sidenav = document.querySelector('#sidebar-list')
const backButton = document.querySelector("#back")
const forwardButton = document.querySelector("#forward")

fetchBoroughs()

function fetchBoroughs(){
 return fetch(boroughURL)
 .then(resp => resp.json())
 .then(json => renderBoroughs(json))
}

function renderBoroughs(json){
  json.forEach(function(borough){
  const boroughName = document.createElement('li')
    boroughName.innerText = borough.name
    boroughName.id = borough.id
    sidenav.append(boroughName)
  })
}

sidenav.addEventListener("click",fetchLocations)

function fetchLocations(event){
  event.preventDefault()
  locationContainer.innerHTML=""
  const clickedBorough = event.target.id
  return fetch(boroughURL+`/${clickedBorough}`)
    .then(res => res.json())
    .then(locations => renderLocations(locations))
}

function renderLocations(locations){
  locations.forEach(function(location){
    const locationCard = document.createElement("div")
    const locationImage = document.createElement('img')
    const locationName = document.createElement('p')
    locationImage.className = "location-card"
    locationImage.src = location.image
    locationName.className = "location-name"
    locationName.innerText = location.name
    locationCard.append(locationImage,locationName)
    locationContainer.append(locationCard)
  })
}

forwardButton.addEventListener("click",showNextFive)

function showNextFive(){
  counter += 1
  locationContainer.innerHTML= ""
//   fetch(`${locationsURL}/?_limit=5&_page=${counter}`)
//     .then(res => res.json())
//     .then(locations => locations.forEach(showLocation))
}

backButton.addEventListener("click",showLastFive)

function showLastFive(){
  counter -=1
  locationContainer.innerHTML= ""
//   fetch(`${locationsURL}/?_limit=5&_page=${counter}`)
//     .then(res => res.json())
//     .then(locations => locations.forEach(showLocation))
}
