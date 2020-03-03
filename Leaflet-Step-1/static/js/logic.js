// Store the API in a queryUrl
function chooseColor (mag) {
  var color = "";
  if (mag < 1) {color = "rgb(0, 230, 0)"}
  else if (mag < 2) { color = "rgb(204, 255, 102)"}
  else if (mag < 3) { color = "rgb(255, 255, 102)"}
  else if (mag < 4) { color = "rgb(255, 153, 51)"}
  else if (mag < 5) { color = "rgb(255, 102, 0)"}
  else {color = "rgb(255, 0, 0)"}
}
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform an API call to the data source 
d3.json(queryUrl, function(data){
  createfeatures(data.features);
})

function createfeatures (earthquakeData) {

      // function onEachFeature(feature, layer) {
      //    layer.bindPopup("<h3>" + feature.properties.place +
      //      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      // }
      // for (var i=0; i< length , i++)  var
      
     
        var earthquakes = L.geoJSON(earthquakeData, {
          pointToLayer: function (feature, latlng) {
            var geojsonMarkerOptions = {
              radius: 8,
              fillColor: "#ff7800",
              color: chooseColor(feature.properties.mag),
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
             };
            return L.circleMarker(latlng, geojsonMarkerOptions);
        });
        //   "geometry": {
        //     "type": "circle",
        //     "coordinates": [-104.99404, 39.75621]
        // },
        //   style: function(feature) {
        //     return {
        //       type:"circle",
        //       color: "black",
        //       radius: feature.properties.mag * 10000,
        //       // Call the chooseColor function to decide which color to color 
        //       fillColor: chooseColor(feature.properties.mag),
        //       fillOpacity: 0.5,
        //       weight: 1.5
        //     };
        //   },
        //   //onEachFeature: onEachFeature
        // });
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
    var overlayMaps = {"Earthquakes": earthquakes};
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