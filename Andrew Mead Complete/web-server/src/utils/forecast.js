const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/8cad36232507253e163e824bb1c2a23f/" +
    latitude +
    "," +
    longitude;

  //destructuring & setting default value of empty object
  request({ url, json: true }, (error, { body } = {}) => {
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
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
