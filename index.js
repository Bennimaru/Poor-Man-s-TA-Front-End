console.log("hi");

document.addEventListener('DOMContentLoaded', login)

function login(event){
  const modal = document.querySelector('.modal')
  modal.style.display = "block"
}

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
const formLocation = document.querySelector("#formLocation")
const sidenav = document.querySelector('#sidebar-list')
const addForm = document.querySelector('.add-form')
const toggleForm = document.querySelector('.toggleForm')
const backButton = document.querySelector("#back")
const forwardButton = document.querySelector("#forward")

fetchBoroughs()
sidenav.addEventListener("click",fetchLocations)
locationContainer.addEventListener("click",fetchSingleLocation)
formLocation.addEventListener("submit",editLocationDetails)
addForm.addEventListener("submit", createPlace)

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

function fetchLocations(event){
  event.preventDefault()
  locationContainer.innerHTML=""
  singleLocation.innerHTML=""
  formLocation.innerHTML=""
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
  singleLocationName.innerText = `Name: ${location.name}`
  singleLocationImage.className = "singleLocationImage"
  singleLocationAddress.innerText = `Address: ${location.address}`
  singleLocationDesc.innerText = `Description: ${location.description}`
  singleLocationCard.append(singleLocationImage,singleLocationName,singleLocationAddress,singleLocationDesc)
  singleLocation.append(singleLocationCard)

  formLocation.innerHTML= `
  <form action="PATCH" class="edit-form">
    <div class="form-group">
      <input type="text" name="name" class="form-control" value="${location.name}">
      <input type="text" name="address" class="form-control" value="${location.address}">
      <input type="text" name="image" class="form-control" value=${location.image}>
      <input type="text" name="description" class="form-control" value="${location.description}">
      <select data-location-id=${location.id}>
        <option value="1">Bronx</option>
        <option value="2">Brooklyn</option>
        <option value="3">Manhattan</option>
        <option value="4">Queens</option>
        <option value="5">Staten Island</option>
      </select>
    </div>
    <button type="submit" class="btn" id="btn-edit">Submit</button>
    <button type="submit" class="btn" id="btn-delete">Delete</button>
  </form>`
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

toggleForm.addEventListener('click', (event) => {
  if (addForm.style.display === "none"){
    addForm.style.display = "block";
  } else {
    addForm.style.display = "none";
  }
})

function createPlace(event){
  event.preventDefault()
  let newData = {
    name: event.target[0].value,
    address: event.target[1].value,
    image: event.target[2].value,
    description: event.target[3].value,
    borough_id: event.target[4].value
  }
  fetch(locationsURL, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newData)
  })
}

// function pickAction(event){
//
// }

function editLocationDetails(event){
  event.preventDefault()
  let locationId = parseInt(event.target[4].dataset.locationId)
  let editedData = {
    name: event.target[0].value,
    address: event.target[1].value,
    image: event.target[2].value,
    description: event.target[3].value,
    borough_id: event.target[4].value
  }
  fetch(locationsURL+`/${locationId}`,{
    method: "PATCH",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify(editedData)
  })
  .then(console.log("hi"))
}

let loginSubmit = document.querySelector('.login')
loginSubmit.addEventListener('submit', (event) => {
  newUser = {
    name: event.target[0].value
  }
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  event.preventDefault()
  const modal = document.querySelector('.modal')
  modal.style.display = "none"
})
