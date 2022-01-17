/*In this video, we will be learning how to use another http api in our weather app. The api we will be using provides a geocoding service.
GEO-CODING : - Is the process of taking a specific address like Lagos, Nigeria and converting it to a latitude/longitude coordinates. This is greate because once we have the lat/long, we will be able to pass them off to the darksky api to get the weather information for that location.

The geo-coding service we will be using is "https://www.mapbox.com"

1-  Signup and login on the website
2-  You will be taken to the dashboard
3-  Click the Access tokens tab
4-  Visit the link https://docs.mapbox.com/api/search/
5-  Check under the "Example request: Forward geocoding" for a sample API Call, and now we have a complete url we can explore.

https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFraW5kaWlsZXRlIiwiYSI6ImNqemFxc3BzdDAwNHEzY2sybTZwbnprZGkifQ.8vza1dVLK-hFjHncjynw0w

Here we will see we are dealing with "Los Angeles"

6-  Grab the entire url and paste it int he browser to see the result we get back

On the browser page, we get a JSON response containing properties like "type, query, fixtures & attribution".

Both the type and attribution are not useful to us.
query :  This contains the place we searched for
fixtures: This is an array of the 5 most relevance places that match the result and it contains many objects... They are sort by relevance but the first result is the one we want to be using, if this is not what user wants then they can be more specific with the search term adding things like the country name.

"Center" :- The center property contains the lat & long of the place searched for and this is what we will be passing to the darksky API to get our weather forecast.*/

/*OPTIONAL OPTIONS FOR MAPBOX API
We can see all this in the docs : - language, limit.
We can use "limit" to limit the search result to just one

https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFraW5kaWlsZXRlIiwiYSI6ImNqemFxc3BzdDAwNHEzY2sybTZwbnprZGkifQ.8vza1dVLK-hFjHncjynw0w&limit=1

*/

/*CHALLENGE : - Print the lat/long for Los Angeles
1-  Fire off a new request to the URL explored in browser
2-  Move the request module parse it as JSON
3-  Print both the lat and long to the terminal
4-  Test your work
*/

//app.js
//CALLING GEO-CODING API
const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFraW5kaWlsZXRlIiwiYSI6ImNqemFxc3BzdDAwNHEzY2sybTZwbnprZGkifQ.8vza1dVLK-hFjHncjynw0w&limit=1";

request({ url: geocodeURL, json: true }, (error, response) => {
  const latitude = response.body.features[0].center[0];
  const longitude = response.body.features[0].center[1];
  console.log(latitude, longitude);
});
/*-118.2439 34.0544
Partly cloudy throughout the day. It is currently 59.66. There is a 0% chance of */
