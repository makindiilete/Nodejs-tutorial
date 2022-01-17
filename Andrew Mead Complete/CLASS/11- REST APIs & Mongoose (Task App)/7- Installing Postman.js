/*We will be using postman to make our http requests instead of using the browser.
Once you install Post Man and launch it > Click on GET request
name : Get Weather : This will be used for our weather app request
Add a collection : Weather App and save.

In the Get url, type your heroku weather endpoint url : - https://michaelz-weather-application.herokuapp.com/weather?address=lagos

where "/weather" is the route and "?address=ibadan" is the query string.

Now if we click on send, we should get our response in postman : -

{
    "forecast": "Rain in the morning and overnight. It is currently 78.76 degrees out. The high today is 85.35 with a low of 74.03. There is a 0% chance of rain",
    "location": "Lagos, Lagos, Nigeria",
    "address": "lagos"
}
*/
