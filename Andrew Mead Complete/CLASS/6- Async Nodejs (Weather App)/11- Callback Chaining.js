/*We will learn how to use the callback chaining pattern with our async nodejs code. So that instead of having our two async operations which are currently operating independently of the other, we can chain them together so that we will be able to do one thing and then use the result to do the next which in this case, we will be able to geocode an address, then we can take the coordinates and pass it to our forecast function*/

//app.js
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//CALL BACK CHAINING
//Geocode function call
geocode("Ibadan, Oyo", (error, data) => {
  if (!error) {
    console.log("Data ", data);
  } else {
    console.log("Error ", error);
  }

  //Weather forecast function call and here we removed our hardcoded lat & long data and replaced it with the lat & long response inside geocode data object
  forecast(data.latitude, data.longitude, (error, data) => {
    if (!error) {
      console.log("Data ", data);
    } else {
      console.log("Error ", error);
    }
  });
});

/*Running the app : -
Data  { latitude: 7.83333,
  longitude: 3.93333,
  location: 'Oyo, Nigeria' }
Data  Rain and humid throughout the day. It is currently 71.89. There is a 0.34% chance of rain
*/

/*Now we want to adjust our code to : -
1-  Check for errors from geocode and forecast and if they occur we stop code execution
2-  We print only the Location and the forecast data*/

//app.js
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//CALL BACK CHAINING
//Geocode function call
geocode("Ibadan, Oyo", (error, data) => {
  //if something goes wrong with geocode then we print the error and "return" to stop execution
  if (error) {
    console.log(error);
    return;
  }
  //we remove printing of the error and data for geocode because we dont need it, we simply move on to printing the weather forecast

  /*  if (!error) {
      console.log("Data ", data);
    } else {
      console.log("Error ", error);
    }*/

  //Weather forecast function call and here we removed our hardcoded lat & long data and replaced it with the lat & long response inside geocode data object
  forecast(data.latitude, data.longitude, (error, forecastData) => {
    //if something goes wrong with forecast, we also print the error and stop the code execution
    if (error) {
      console.log(error);
      return;
    }
    //if all works well then we print the location, forecast
    if (!error) {
      //printing the location from the geocode function which is inside Data{}
      console.log(data.location);
      //printing the forecastData response from the forecast function
      console.log(forecastData);
    } else {
      console.log("Error ", error);
    }
  });
});

/*Running the app we get : -
Oyo, Nigeria
Rain and humid throughout the day. It is currently 72.09. There is a 0.33% chance of rain
*/

/*NOW WE WANT TO BE ABLE TO PASS THE LOCATION WE WANT TO SEARCH FOR VIA COMMAND LINE ARGUMENT.

Goal : - Accept location via command line argument
1-  Access the command line argument without yargs
2-  Use the string value as the input for geocode
3-  Only geocode if a location was provided
4-  Test your work with a couple locations*/

/*Step 1*/
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(process.argv);

//CALL BACK CHAINING
//Geocode function call
geocode("Ibadan, Oyo", (error, data) => {
  //if something goes wrong with geocode then we print the error and "return" to stop execution
  if (error) {
    console.log(error);
    return;
  }
  //we remove printing of the error and data for geocode because we dont need it, we simply move on to printing the weather forecast

  /*  if (!error) {
      console.log("Data ", data);
    } else {
      console.log("Error ", error);
    }*/

  //Weather forecast function call and here we removed our hardcoded lat & long data and replaced it with the lat & long response inside geocode data object
  forecast(data.latitude, data.longitude, (error, forecastData) => {
    //if something goes wrong with forecast, we also print the error and stop the code execution
    if (error) {
      console.log(error);
      return;
    }
    //if all works well then we print the location, forecast
    if (!error) {
      //printing the location from the geocode function which is inside Data{}
      console.log(data.location);
      //printing the forecastData response from the forecast function
      console.log(forecastData);
    } else {
      console.log("Error ", error);
    }
  });
});

/*Running the code : -

node app.js "Ibadan"

[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Michaelz Omoakin\\Documents\\Web development\\Nodejs\\Andrew Mead complete
 Nodejs\\weather-app\\app.js',
  'Ibadan' ]

Oyo, Nigeria
Rain and humid throughout the day. It is currently 72.24. There is a 0.32% chance of rain

We can see that the string we passed is now in the process.argv array with the index of 2, and so we can easily use this as a variable for our address in the geocode function.
*/

//app.js
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//setting a variable "address" with its value as the 3rd element of our process.argv command line arg
const address = process.argv[2];
console.log(process.argv);

//CALL BACK CHAINING
//Geocode function call
//here we using the variable declared as our address instead of a hardcoded value
geocode(address, (error, data) => {
  //if something goes wrong with geocode then we print the error and "return" to stop execution
  if (error) {
    console.log(error);
    return;
  }
  //we remove printing of the error and data for geocode because we dont need it, we simply move on to printing the weather forecast

  /*  if (!error) {
      console.log("Data ", data);
    } else {
      console.log("Error ", error);
    }*/

  //Weather forecast function call and here we removed our hardcoded lat & long data and replaced it with the lat & long response inside geocode data object
  forecast(data.latitude, data.longitude, (error, forecastData) => {
    //if something goes wrong with forecast, we also print the error and stop the code execution
    if (error) {
      console.log(error);
      return;
    }
    //if all works well then we print the location, forecast
    if (!error) {
      //printing the location from the geocode function which is inside Data{}
      console.log(data.location);
      //printing the forecastData response from the forecast function
      console.log(forecastData);
    } else {
      console.log("Error ", error);
    }
  });
});

/*If we run the code now : -
node app.js Ibadan

[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Michaelz Omoakin\\Documents\\Web development\\Nodejs\\Andrew Mead complete
 Nodejs\\weather-app\\app.js',
  'Ibadan' ]

Ibadan North, Oyo, Nigeria
Possible light rain until evening. It is currently 74.82. There is a 0.08% chance of rain
 */

/*Now we want to add validation to check if an address is provided for us to geocode, else we will print some error string*/

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
  //Geocode function call
  //here we using the variable declared as our address instead of a hardcoded value
  geocode(address, (error, data) => {
    //if something goes wrong with geocode then we print the error and "return" to stop execution
    if (error) {
      console.log(error);
      return;
    }
    //we remove printing of the error and data for geocode because we dont need it, we simply move on to printing the weather forecast

    /*  if (!error) {
          console.log("Data ", data);
        } else {
          console.log("Error ", error);
        }*/

    //Weather forecast function call and here we removed our hardcoded lat & long data and replaced it with the lat & long response inside geocode data object
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      //if something goes wrong with forecast, we also print the error and stop the code execution
      if (error) {
        console.log(error);
        return;
      }
      //if all works well then we print the location, forecast
      if (!error) {
        //printing the location from the geocode function which is inside Data{}
        console.log(data.location);
        //printing the forecastData response from the forecast function
        console.log(forecastData);
      } else {
        console.log("Error ", error);
      }
    });
  });
}
console.log(process.argv);

/*Running the code without an address : -
node app.js

Please Provide an Address!

[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Michaelz Omoakin\\Documents\\Web development\\Nodejs\\Andrew Mead complete
 Nodejs\\weather-app\\app.js' ]

 */

/*Running the code with an address : -
node app.js Kaduna

[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Michaelz Omoakin\\Documents\\Web development\\Nodejs\\Andrew Mead complete
 Nodejs\\weather-app\\app.js',
  'Kaduna' ]

Kaduna, Nigeria
Rain in the evening. It is currently 72.72. There is a 0% chance of rain

 */
