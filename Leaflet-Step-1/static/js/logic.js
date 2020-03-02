// Store the API in a queryUrl

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform an call to the queryUrl 
d3.json(queryUrl,function(response){
    console.log(response)
})