/*We will continue to explore our request and see how the request library can automatically parse the JSON to an object for us and how we can print a forecast using the return data and finally we will explore some other options for the darksky API allowing us to do things like changing the language or the unit*/

//app.js
const request = require("request");
//the endpoint we want to make request to
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233";

//using "json: true" for request library to automatically parse the JSON data
request({ url: url, json: true }, (error, response) => {
  //Accessing only the information under "currently" property
  console.log(response.body.currently);
});

/*Result : -
{ time: 1566981891,
  summary: 'Clear',
  icon: 'clear-night',
  precipIntensity: 0,
  precipProbability: 0,
  temperature: 60.56,
  apparentTemperature: 61,
  dewPoint: 60.45,
  humidity: 1,
  pressure: 1011.27,
  windSpeed: 5.59,
  windGust: 8.32,
  windBearing: 261,
  cloudCover: 0.1,
  uvIndex: 0,
  visibility: 7.799,
  ozone: 296.1 }*/

/*CHALLENGE : - Print a small forecast to the user
1-  Print: "It is currently 58.55 degrees out. There is 0% chance of rain."
2-  Test your work!*/

const request = require("request");
//the endpoint we want to make request to
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233";

//using "json: true" for request library to automatically parse the JSON data
request({ url: url, json: true }, (error, response) => {
  //printing a customized forecast
  console.log(
    "It is currently " +
      response.body.currently.temperature +
      ". There is a " +
      response.body.currently.precipProbability +
      "% chance of rain"
  );
});

/*Running the app : -
It is currently 60.59. There is a 0% chance of rain*/

/*Now let us examine how to access additional options available to us via darksky API like language and unit change... To do this we will append some other options to our url.*/

//the endpoint we want to make request to
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233";
//url with additional options for language/unit change
const url2 =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233?key=value&otherKey=otherValue";

//CHANGING THE UNITS TO "SI"
const request = require("request");
//adding additional options to change the units "?units=si"
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233?units=si";

//using "json: true" for request library to automatically parse the JSON data
request({ url: url, json: true }, (error, response) => {
  //printing a customized forecast
  console.log(
    "It is currently " +
      response.body.currently.temperature +
      ". There is a " +
      response.body.currently.precipProbability +
      "% chance of rain"
  );
});

/*Running the app : -
It is currently 15.83. There is a 0% chance of rain*/

//CHANGING THE UNIT TO "us"
const request = require("request");
//adding additional options to change the units "?units=su"
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233?units=us";

//using "json: true" for request library to automatically parse the JSON data
request({ url: url, json: true }, (error, response) => {
  //printing a customized forecast
  console.log(
    "It is currently " +
      response.body.currently.temperature +
      ". There is a " +
      response.body.currently.precipProbability +
      "% chance of rain"
  );
});

/*It is currently 60.48. There is a 0% chance of rain*/

/*Printing a customized forecast from the daily property*/
const request = require("request");
//endpoint
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233";

//using "json: true" for request library to automatically parse the JSON data
request({ url: url, json: true }, (error, response) => {
  //printing a customized forecast
  console.log(
    `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature}. There is a ${response.body.currently.precipProbability}% chance of rain`
  );
});

/*Running the app : -
Partly cloudy throughout the day. It is currently 60.3. There is a 0% chance of rain
*/

//CHANGING THE FORECAST LANGUAGE
const request = require("request");
//changing the language with "?lang=es"
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233?lang=es";

//using "json: true" for request library to automatically parse the JSON data
request({ url: url, json: true }, (error, response) => {
  //printing a customized forecast
  console.log(
    `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature}. There is a ${response.body.currently.precipProbability}% chance of rain`
  );
});

/*Running the app : -
Parcialmente nublado durante el día. It is currently 60.23. There is a 0% chance of rain
*/
