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
const singleLocation = document.querySelector('#singleLocation')
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
    const locationName = document.createElement('h4')
    locationImage.className = "location-card"
    locationImage.src = location.image
    locationImage.id = location.id
    locationName.className = "location-name"
    locationName.innerText = location.name
    locationCard.append(locationImage,locationName)
    locationContainer.append(locationCard)
  })
}

locationContainer.addEventListener("click",fetchSingleLocation)

function fetchSingleLocation(event){
  event.preventDefault()
  singleLocation.innerHTML=''
  const clickedLocation = event.target.id
  return fetch(locationsURL+`/${clickedLocation}`)
  .then(res => res.json())
  .then(location => renderSingleLocation(location))
}

function renderSingleLocation(location){
  const singleLocationCard = document.createElement("div")
  const singleLocationImage = document.createElement("img")
  const singleLocationName = document.createElement("p")
  const singleLocationAddress = document.createElement("p")
  const singleLocationDesc = document.createElement("p")
  singleLocationImage.src = location.image
  singleLocationName.innerText = location.name
  singleLocationImage.className = "singleLocationImage"
  singleLocationAddress.innerText = `Address: ${location.address}`
  singleLocationDesc.innerText = `Description: ${location.description}`
  singleLocationCard.append(singleLocationImage,singleLocationName,singleLocationAddress,singleLocationDesc)
  singleLocation.append(singleLocationCard)
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

let addForm = document.querySelector('.add-form')
addForm.addEventListener("submit", createPlace)
let toggleForm = document.querySelector('.toggleForm')
toggleForm.addEventListener('click', (event) => {
  if (addForm.style.display === "none"){
    addForm.style.display = "block";
  } else {
    addForm.style.display = "none";
  }
})

function createPlace(event){
  debugger
  event.preventDefault()
  console.log(event)
  let newData = {
    name: event.target[0].value,
    address: event.target[1].value,
    image: event.target[2].value,
    description: event.target[3].value,
    borough_id: event.target[4].value
  }
  fetch("http://localhost:3000/locations", {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newData)
  })
}
