// Store the API in a queryUrl
// Funtion to scale the marker size
function  markerSize (mag) {
  return mag*mag*50000;
};
function chooseColor(mag) {
  var color = "";
  if (mag < 1) {return "rgb(0, 255, 0)"}
  else if (mag < 2) { return "rgb(128, 255, 0)"}
  else if (mag < 3) { return "rgb(255, 128, 0)"}
  else if (mag < 4) { return "rgb(255, 128, 50)"}
  else if (mag < 5) { return "rgb(255, 0, 152)"}
  else {return "rgb(152, 0, 152)"}
  };

  var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  
  // Perform an call to the queryUrl 
  d3.json(queryUrl,function(response){
      // send data 
      createFeatures(response.features)
  });
  
  function createFeatures (earthquakeData) {
      var earthquakes = L.geoJSON(earthquakeData, {   
        onEachFeature : function (feature, layer) {
          layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" 
          + new Date(feature.properties.time) + "</p>");
        },
        pointToLayer: function (feature, latlgn ) {
            return new L.circle( latlgn , {
              stroke: true,
              fillOpacity: 0.5,
              weight: 0.5,
              color: "white",
              fillColor: chooseColor(feature.properties.mag),
              radius: markerSize(feature.properties.mag)
            })      
          }
      })
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

        "Dark Map": darkmap,
        "Ligth Map": streetmap
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
        layers: [darkmap, earthquakes]
      });
      // Create a layer control
      // Pass in our baseMaps and overlayMaps
      // Add the layer control to the map
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", 'info legend');
      var colors = ["rgb(0, 255, 0)","rgb(128, 255, 0)", "rgb(255, 128, 0)", "rgb(255, 128, 50)", "rgb(255, 0, 152)", "rgb(152, 0, 152)"];
      var limits = [0,1,2,3,4,5];
     
      // loop through our intervals and generate a label
      //with a colored square for each interval
       // var legendInfo = "<h1> Earthquake Magnitude</h1>" 
  
      // div.innerHTML = legendInfo;
      console.log(limits)
      for (var i = 0; i < colors.length; i++) {
        div.innerHTML +=
        '<i style="background:' + colors[i] + '"></i> ' +
            limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
            }
        // div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
    }
