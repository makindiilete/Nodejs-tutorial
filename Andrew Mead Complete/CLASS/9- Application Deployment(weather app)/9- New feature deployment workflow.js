/*In this video, we will be talking about how to add new fixtures to our deployed application and update those changes to github and heroku so the app can get updated.

To do this, we add the fixtures and test them on local server first before deploying them.

We add some text content to the about page, describing where the data is coming from and as challenge and add some new data into the forecast that comes back.

We add a new paragraph to the "about.hbs"
    <p>This site was created by Michaelz Omoakin. It uses data from mapbox.com and darksky.net</p>

1-  Commit the changes and push it back to github
2-  Run "git push heroku master" to push the latest code back to heroku to redeploy our app*/

/*CHALLENGE : - Add new data to forecast
1-  Update the forecast string to include new data
2-  Commit your changes
3-  Push your changes to Github and deploy to heroku
4-  Test your work in the live application*/

//forecast.js
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
      //Testing to see what the body.daily.data[0] returns so we can pick the properties we want to include in the forecast
      console.log(body.daily.data[0]);
      //printing a customized forecast
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature}. There is a ${body.currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;

//forecast.js
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

/*Now we can commit and push our message back to github
 * Now we push them back to heroku "git push heroku master"*/
