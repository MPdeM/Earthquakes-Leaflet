// Funtion to scale the marker size
function  markerSize (mag) {
  return mag*100000;
}
// Funtion to scale the color
function chooseColor (mag) {
  var color = "";
  if (mag < 1) {color = "ligthgreen"}
  else if (mag < 2) { color = "rgb(204, 255, 102)"}
  else if (mag < 3) { color = "rgb(255, 255, 102)"}
  else if (mag < 4) { color = "rgb(255, 153, 51)"}
  else if (mag < 5) { color = "rgb(255, 102, 0)"}
  else {color = "rgb(255, 0, 0)"}
}
// Store the API in a queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
var container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }
// Perform an API call to the data source 
d3.json(queryUrl, function(data){
  createfeatures(data.features);
  // console.log(data)
})

function createfeatures (earthquakeData) {
  var container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }
  // console.log(earthquakeData)
  var earthqMarkers=[];
  for (var i=0; i < earthquakeData.length; i++){
    var lat= earthquakeData[i].geometry.coordinates[1];
    var lon= earthquakeData[i].geometry.coordinates[0];
    var mag= earthquakeData[i].properties.mag;

    
      var color = "";
      if (mag < 1) {color = "pink"}
      else if (mag < 2) { color = "rgb(204, 255, 102)"}
      else if (mag < 3) { color = "rgb(255, 255, 102)"}
      else if (mag < 4) { color = "rgb(255, 153, 51)"}
      else if (mag < 5) { color = "rgb(255, 102, 0)"}
      else {color = "rgb(255, 0, 0)"}
    
    
    // Set the marker size and color proportional to the magnitude
    earthqMarkers.push(
      L.circle([lat,lon], {
        stroke: false,
        fillOpacity: 0.75,
        
        color: "white",
        fillColor: color,
        radius: markerSize(earthquakeData[i].properties.mag)
      })
    );
    
    var earthquakes = L.layerGroup(earthqMarkers);
  } 
  
    
    createMap(earthquakes);
}
   

function createMap(earthquakes) {
  var container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Ligth Map": streetmap,
    "Dark Map": darkmap
  };
  // Create overlay object to hold our overlay layer
  var overlayMaps = {"Earthquakes": earthquakes};
  // Create our map, giving it the streetmap and earthquakes layers to display on 
  
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 2,
    layers: [streetmap, earthquakes]
  });
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}