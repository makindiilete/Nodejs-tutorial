/*It will be up to us to use the object property shorthand and destructuring inside the weather application.*/
/*CHALLENGE : - Use both destructuring and property shorthand in weather app
1-  Use destructuring in app.js, forecast.js, and geocode.js
2-  Use property shorthand in forecast.js and geocode.js
3-  Test your work and ensure app still works.*/

/*NOTE : -
/*if we have "data.latitude", to destructure this inside function argument, we will have {latitude}=data
*
SO WE ARE ALWAYS GETTING RID OF THE FIRST STRING INSIDE WHICH WE EXTRACT THE DATA AND WE PUT THE DATA WE ARE EXTRACTING INSIDE {}*/

//app.js
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//setting a variable "address" with its value as the 3rd element of our process.argv command line arg
const address = process.argv[2];
//if an address is not provided
if (!address) {
  console.log("Please Provide an Address!");
}
//if we have an address
else {
  //CALL BACK CHAINING
  //Geocode function call (DESTRUCTURING lat,long & location from data)
  geocode(address, (error, { latitude, longitude, location }) => {
    //if something goes wrong with geocode then we print the error and "return" to stop execution
    if (error) {
      console.log(error);
      return;
    }

    //Weather forecast function call and here we removed our hardcoded lat & long data and replaced it with the lat & long response inside geocode data object
    forecast(latitude, longitude, (error, forecastData) => {
      //if something goes wrong with forecast, we also print the error and stop the code execution
      if (error) {
        console.log(error);
        return;
      }
      //if all works well then we print the location, forecast
      if (!error) {
        //printing the location from the geocode function which is inside Data{}
        console.log(location);
        //printing the forecastData response from the forecast function
        console.log(forecastData);
      } else {
        console.log("Error ", error);
      }
    });
  });
}
console.log(process.argv);

//forecast.js
const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/" +
    latitude +
    "," +
    longitude;

  //destructuring
  request({ url, json: true }, (error, { body }) => {
    //Low level network error
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    }
    //User input error
    else if (body.error) {
      callback("Unable to find location!", undefined);
    }
    //If everything is fine
    else {
      //printing a customized forecast
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature}. There is a ${body.currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;

//geocode.js
const request = require("request");

const geocode = (address, callback) => {
  //Now we tweak the url and remove the hardcoded address so it can work for multiple addresses
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibWFraW5kaWlsZXRlIiwiYSI6ImNqemFxc3BzdDAwNHEzY2sybTZwbnprZGkifQ.8vza1dVLK-hFjHncjynw0w&limit=1";

  //here we make our http request (DESTRUCTURING)
  request({ url, json: true }, (error, { body }) => {
    //if there is an error then the error callback will have a string for error message and undefined for the response
    if (error) {
      callback("Unable to connect to location services!", undefined);
    }
    //this callback will get called if something is wrong with our input
    else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    }
    //  if things go well, we provide a callback with error as undefined and an a response object
    else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
