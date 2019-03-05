console.log("hi");

$(document).ready(function(){
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});

fetchBoroughs()

function fetchBoroughs(){
 fetch('http://localhost:3000/boroughs')
 .then(resp => resp.json())
 .then(json => renderBoroughs(json))
}

function renderBoroughs(json){
  const sidenav = document.querySelector('#sidebar-list')
  json.forEach(function(borough){
  const boroughName = document.createElement('li')
    boroughName.innerText = borough.name
    boroughName.id = borough.id
    sidenav.append(boroughName)
  })
}
