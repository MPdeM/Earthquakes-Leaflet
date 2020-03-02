# Earthquakes-Leaflet
Earthquake-distribution using Leaflet
This project retrieves  Earthquake data available from the United States Geological Survey, USGS. 
The data can be found on " https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php" 



The main code is written in a JavaScript file static/js/logic.js. The code uses MapBox*. The data, in GeoJSON format, is retrieved from API using D3. The plots and interactive visualizations use Leaflet.js library . Finally the data is deployed with index.html. 

*Mapbox is a free API. to use it, it is required to create a free account at https://mapbox.com and generate a token, to be added in the static/js/config.js in order to use it.