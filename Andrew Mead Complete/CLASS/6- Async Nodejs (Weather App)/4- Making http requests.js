/*This is how your app will communicate to the outside world. So to get a weather data into your app, you gonna send an http request, if you want to send email,sms (twilio api) these are also made possible via http request.

For our weather app, we will be using a weather service from darksky.net

1-  Visit https://darksky.net/dev and sign-up or sign-in (1000 free requests per day)
2-  Login and on your dashboard you have your Account secret key (We use this when you make http request from the darksky API from our nodejs app and it allows the darksky API keep track of our account and the number of requests we are making)
3-  Below we have the "Sample API Call", open it in a new tab

//DARKSKY DETAILS
Secret Key : - 8cad36232507253e163e824bb1c2a23f
Sample API Call : - https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233
*/

//MAKING HTTP REQUEST VIA npm "request" library

const request = require("request");
//the endpoint we want to make request to
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233";

//using the request library, takes two args : - object (containing a variable set to our url) and a callbackfn containing either an error or response
request({ url: url }, (error, response) => {
  console.log(response);
});

/*Running the app : - This will return alot and a lot of messages which will be un-useful, so we can slim down this information and return only the "body" property which contains the data we need in a JSON string*/

const request = require("request");
//the endpoint we want to make request to
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233";

//using the request library, takes two args : - object (containing a variable set to our url) and a callbackfn containing either an error or response
request({ url: url }, (error, response) => {
  //The data returned from server is JSON so we convert it to a JS obj
  const data = JSON.parse(response.body);
  //Accessing all information under the "body" property
  console.log(data);
});

/*Now get in return still a lot of results but a lesser one because we are accessing only the body property..... We can take this further and access only the "currently" property*/

const request = require("request");
//the endpoint we want to make request to
const url =
  "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/37.8267,-122.4233";

//using the request library, takes two args : - object (containing a variable set to our url) and a callbackfn containing either an error or response
request({ url: url }, (error, response) => {
  //The data returned from server is JSON so we convert it to a JS obj
  const data = JSON.parse(response.body);
  //Accessing only the information under "currently" property
  console.log(data.currently);
});

/*Result : -
{ time: 1566981570,
  summary: 'Partly Cloudy',
  icon: 'partly-cloudy-night',
  nearestStormDistance: 14,
  nearestStormBearing: 76,
  precipIntensity: 0,
  precipProbability: 0,
  temperature: 60.68,
  apparentTemperature: 61.04,
  dewPoint: 60.02,
  humidity: 0.98,
  pressure: 1011.08,
  windSpeed: 6.64,
  windGust: 9.6,
  windBearing: 246,
  cloudCover: 0.15,
  uvIndex: 0,
  visibility: 8.226,
  ozone: 296.1 }
*/
