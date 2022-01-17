/*We will turn our attention once again to our front end and the goal is to figure out how to make http request for that forecast data from client side javascript in the browser. That will allow us to create a form, submit it, fetch the data and on the fly re-render the page to show that weather info.

Fetching the API data from client side will require us to work inside the "app.js" which we have inside the public further which we have linked to the index.hbs.

We will be using "fetch()" to fetch api data from server to the browser and do something with it. The fetch api is available to all modern browsers but not accessible in nodejs so the code we write inside the client side app.js cannot be used inside our backend node script.*/

//app.js (CLIENT SIDE)
console.log("Client side javascript file is loaded!");

//This will kick off I/O async operation just like using "request" in nodejs
//This code below simply says "fetch data from this url and "then" perform this code on the response
fetch("http://puzzle.mead.io/puzzle").then(response => {
  //this will run when the json data as arrived and bin parsed
  response.json().then(data => {
    //  dumping the response into the console
    console.log(data);
  });
});

/*Now if we run the app and refresh the browser, in the console we get our http data response : -

 Client side javascript file is loaded!
{puzzle: "Beautiful Spires"}
puzzle: "Beautiful Spires"
*/

/*CHALLENGE : - Fetch Weather
1-  Setup a call to fetch weather for Boston
2-  Get the parse JSON response
        If error property, print error
        If no error property, print location and forecast
3-  Refresh the browser and test your work*/

//app.js
//Here we use the url we have been using on the backend as our api endpoint on the front end
fetch("http://localhost:3000/weather?address=ibadan").then(response => {
  response.json().then(data => {
    //  If we have an error, we print it from the "error" property inside "data" object
    if (data.error) {
      console.log(data.error);
    }
    //If all goes well, we print location and forecast from the data object
    else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
});

/*Running the app : -
 Ibadan North, Oyo, Nigeria
Light rain until morning, starting again in the evening. It is currently 71.04. There is a 0.51% chance of rain

Running the app with no network : -
Unable to connect to location services!

*/

//Running the app with invalid url in app.js
//Here we use invalid url
fetch("http://localhost:3000/weather?address=!").then(response => {
  response.json().then(data => {
    //  If we have an error, we print it from the "error" property inside "data" object
    if (data.error) {
      console.log(data.error);
    }
    //If all goes well, we print location and forecast from the data object
    else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
});

/*Running the app : - Unable to find location. Try another search.*/
