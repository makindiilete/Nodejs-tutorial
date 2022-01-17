/*Now its time for us to do the same thing we did for geocode to darksky for fetching the forecast.

CHALLENGE : - Create a reusable function for getting the forecast
1-  Setup the "forecast" function in utils/forecast.js
2-  Require the function in app.js and call it as shown below
3-  The forecast function should have three potential calls to callback;"
        Low level error, pass string for error
        Coordinate error, pass string for error
        Success, pass forecast string for data (same format as from before)*/

//This will be the function call
forecast(-75.7088, 44.1545, (error, data) => {
  console.log("Error ", error);
  console.log("Data ", data);
});

//forecast.js file
const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/" +
    latitude +
    "," +
    longitude;

  //using "json: true" for request library to automatically parse the JSON data
  request({ url: url, json: true }, (error, response) => {
    //Low level network error
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    }
    //User input error
    else if (response.body.error) {
      callback("Unable to find location!", undefined);
    }
    //If everything is fine
    else {
      //printing a customized forecast
      callback(
        undefined,
        `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature}. There is a ${response.body.currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;

//app.js
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Geocode function call
geocode("Ibadan, Oyo", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

//Weather forecast function call
forecast(-75.7088, 44.1545, (error, data) => {
  console.log("Error ", error);
  console.log("Data ", data);
});

/*Now if we run the app.js file, we get the result below : -
Error undefined
Data { latitude: 3.93333,
  longitude: 7.83333,
  location: 'Oyo, Nigeria' }
Error  undefined
Data  Windy throughout the day. It is currently -72.81. There is a 0% chance of rain
*/

/*MY PERSONAL REFACTORING IN APP.JS : - Instead of printing out both the error and the data and one will surely be undefined, we can rather print only the one so if we have an error, we print only the error and we wont print "data undefined" and vice versa*/

//app.js
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Geocode function call
geocode("1What2", (error, data) => {
  if (!error) {
    console.log("Data ", data);
  } else {
    console.log("Error ", error);
  }
});

//Weather forecast function call
forecast("-75.708dd8", 44.1545, (error, data) => {
  if (!error) {
    console.log("Data ", data);
  } else {
    console.log("Error ", error);
  }
});

/*Here we have passed invalid location to the geocode function and invalid latitude to the forecast function and running the code we get : -
Error  Unable to find location. Try another search.
Error  Unable to find location!*/

//app.js
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Geocode function call
geocode("Ibadan, Oyo", (error, data) => {
  if (!error) {
    console.log("Data ", data);
  } else {
    console.log("Error ", error);
  }
});

//Weather forecast function call
forecast(-75.7088, 44.1545, (error, data) => {
  if (!error) {
    console.log("Data ", data);
  } else {
    console.log("Error ", error);
  }
});

/*Here we are using valid data and we get : -
Data  { latitude: 3.93333,
  longitude: 7.83333,
  location: 'Oyo, Nigeria' }
Data  Windy throughout the day. It is currently -72.67. There is a 0% chance of rain
*/
