const request = require("request");

const geocode = (address, callback) => {
  //Now we tweak the url and remove the hardcoded address so it can work for multiple addresses
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibWFraW5kaWlsZXRlIiwiYSI6ImNqemFxc3BzdDAwNHEzY2sybTZwbnprZGkifQ.8vza1dVLK-hFjHncjynw0w&limit=1";

  //here we make our http request (DESTRUCTURING & setting a default value params of empty object from response object)
  request({ url, json: true }, (error, { body } = {}) => {
    // request({ url, json: true }, (error, response) => {
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
