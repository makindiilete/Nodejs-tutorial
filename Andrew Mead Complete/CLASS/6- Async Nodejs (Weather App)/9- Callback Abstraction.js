/*Here we will use the callback pattern to improve the weather application.
 * This will allow us creates code that are re-usable and easy to maintain by having separate functions we can call, we can run this code as many times as we need without  copying it over and over so we can get the weather of 5 location, we just call the function 5 times and not to create it 5 times.
 * It will make it easier to do one thing before or after something else i.e. we want to first geocode the address then we want to take the output (lat/long) to fetch the weather.*/

const geocode = (address, callback) => {
  //Now we tweak the url and remove the hardcoded address so it can work for multiple addresses
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibWFraW5kaWlsZXRlIiwiYSI6ImNqemFxc3BzdDAwNHEzY2sybTZwbnprZGkifQ.8vza1dVLK-hFjHncjynw0w&limit=1";

  //here we make our http request
  request({ url: url, json: true }, (error, response) => {
    //if there is a low level error then the error callback will have a string for error message and undefined for the response
    if (error) {
      callback("Unable to connect to location services!", undefined);
    }
    //if we send an invalid location in our input then the fixtures array will be empty and this callback will get called.
    else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    }
    //  if things go well, we provide a callback with error as undefined and an a response object
    else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
};

//Here we passing a location to search for inside our address argument and running the callback function to print the data or error
geocode("New York", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

/*Running the app : -
Data { latitude: -73.9808,
  longitude: 40.7648,
  location: 'New York, New York, United States' }

We successfully get data for new york*/

/*Now we can geocode for multiple locations at once by calling the geocode function multiple times and passing the different locations like below : - */

//Geocoding for New york
geocode("New York", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
//Geocoding for Lagos
geocode("Lagos, Nigeria", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

/*
Error undefined
Data { latitude: -73.9808,
  longitude: 40.7648,
  location: 'New York, New York, United States' }
Error undefined
Data { latitude: 3.4,
  longitude: 6.45,
  location: 'Lagos, Lagos, Nigeria' }
  */

/*Now we can move the geocode function into a separate file and export it into app.js*/

//app.js
const request = require("request");
const geocode = require("./utils/geocode");

geocode("Ibadan, Oyo", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

//geocode.js
const request = require("request");

const geocode = (address, callback) => {
  //Now we tweak the url and remove the hardcoded address so it can work for multiple addresses
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibWFraW5kaWlsZXRlIiwiYSI6ImNqemFxc3BzdDAwNHEzY2sybTZwbnprZGkifQ.8vza1dVLK-hFjHncjynw0w&limit=1";

  //here we make our http request
  request({ url: url, json: true }, (error, response) => {
    //if there is an error then the error callback will have a string for error message and undefined for the response
    if (error) {
      callback("Unable to connect to location services!", undefined);
    }
    //this callback will get called if something is wrong with our input
    else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    }
    //  if things go well, we provide a callback with error as undefined and an a response object
    else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;

/*Now that we have separation of concerns in place we can test the app with another location to see if things still works as expected : - by geocoding for Ibadan, Oyo State

Error undefined
Data { latitude: 3.93333,
  longitude: 7.83333,
  location: 'Oyo, Nigeria' }
*/
