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
