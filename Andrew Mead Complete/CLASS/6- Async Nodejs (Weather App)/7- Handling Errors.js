/*We will focus on handling potential errors during our http request and thereby giving users a better UX experience.
We will setup error handling for our weather http request and as a challenge we will setup error handling for our geo-code request.*/

//HANDLING ERROR DUE TO NO NETWORK (LOWER LEVEL ERROR)

//app.js
const request = require("request");
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233";

//using "json: true" for request library to automatically parse the JSON data
request({ url: url, json: true }, (error, response) => {
  //Adding error handler for level 1 error due to network down
  if (error) {
    console.log("Unable to connect to weather service!");
  } else {
    //printing a customized forecast
    console.log(
      `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature}. There is a ${response.body.currently.precipProbability}% chance of rain`
    );
  }
});

/*Running the app while network is turned off : -
Unable to connect to weather service!
*/
/*Running the app while network is back : -
Partly cloudy throughout the day. It is currently 59.66. There is a 0% chance of rain
 */

//HANDLING ERRORS DUE TO USER INPUT e.g. Bad Coordinates For example a scenario where user provided latitude but no longitude...We can test this by messing with the endpoint url and paste it in the browser to see what we get in return
/*messed up url without longitude : - https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267

In the browser, we get back : -

{
code: 400,
error: "Poorly formatted request"
}
*/

const request = require("request");
//messing with the url removing the longitude
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267";

//using "json: true" for request library to automatically parse the JSON data
request({ url: url, json: true }, (error, response) => {
  //Low level network error
  if (error) {
    console.log("Unable to connect to weather service!");
  }
  //User input error
  else if (response.body.error) {
    console.log("Unable to find location!");
  }
  //If everything is fine
  else {
    //printing a customized forecast
    console.log(
      `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature}. There is a ${response.body.currently.precipProbability}% chance of rain`
    );
  }
});

/*Unable to find location!*/

/*CHALLENGE : - Handle errors for geocoding request
1-  Setup an error handler for low-level errors
2-  Test by disabling network request and running the app
3-  Setup error handling for no matching results
4-  Test by altering the search term and running the app*/

//app.js
const request = require("request");
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233";

//using "json: true" for request library to automatically parse the JSON data
request({ url: url, json: true }, (error, response) => {
  //Low level network error
  if (error) {
    console.log("Unable to connect to weather service!");
  }
  //User input error
  else if (response.body.error) {
    console.log("Unable to find location!");
  }
  //If everything is fine
  else {
    //printing a customized forecast
    console.log(
      `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature}. There is a ${response.body.currently.precipProbability}% chance of rain`
    );
  }
});

//CALLING GEO-CODING API
const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFraW5kaWlsZXRlIiwiYSI6ImNqemFxc3BzdDAwNHEzY2sybTZwbnprZGkifQ.8vza1dVLK-hFjHncjynw0w&limit=1";

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to location services!");
  }
  //error due to user input/ Invalid location
  //    The fixtures[] will not contain any location if the location searched is invalid
  else if (response.body.features.length === 0) {
    console.log("Unable to find location. Try another search!");
  }
  //if everything works well
  else {
    const latitude = response.body.features[0].center[0];
    const longitude = response.body.features[0].center[1];
    console.log(latitude, longitude);
  }
});

/*Now we can test the low level error by disabling the network and running the app : -

Unable to connect to location services!

Testing for invalid input error, we can mess the url and replace Los Angeles with "12what"

const geocodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoibWFraW5kaWlsZXRlIiwiYSI6ImNqemFxc3BzdDAwNHEzY2sybTZwbnprZGkifQ.8vza1dVLK-hFjHncjynw0w&limit=1";

Unable to find location. Try another search!

Replacing it with real location in the url

//CALLING GEO-CODING API
const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/lagos.json?access_token=pk.eyJ1IjoibWFraW5kaWlsZXRlIiwiYSI6ImNqemFxc3BzdDAwNHEzY2sybTZwbnprZGkifQ.8vza1dVLK-hFjHncjynw0w&limit=1";
*/
