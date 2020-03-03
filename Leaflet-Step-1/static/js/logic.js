// Store the API in a queryUrl

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform an call to the queryUrl 
d3.json(queryUrl,function(response){
    console.log(response.features)
    // send data 
    createFeatures(response.features)
})

function createFeatures (earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
          "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
   
    var earthquakeMarker = L.circle(feature.geometry, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      radius: feature.properties.mag * 10000         
    })

    var earthquakes = L.geoJSON(earthquakeData, {
        style: function(feature) {
          return {
            shape:"circle",
            color: "white",
            // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
            fillColor: chooseColor(feature.properties.borough),
            fillOpacity: 0.5,
            weight: 1.5
          };
        marker: 
        onEachFeature: onEachFeature
      });
      createMap(earthquakes);
}
function createMap(earthquakes) {
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
    var overlayMaps = {
      Earthquakes: earthquakes
    };
    // Create our map, giving it the streetmap and earthquakes layers to display on load
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