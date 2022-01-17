/*Now that our APIs are authenticated and sends token when users signup or login, it is time to talk about how those tokens will be used to actually authenticate other requests.

Remember, every single request to the APIs will require authentication excluding login & sign up.

EXPRESS MIDDLEWARE : - This is at the core of getting all of these done.
We will explore this in the index.js file
*/

//
//Without middleware: new request -> run route handler (This is what we have been doing so far when we send a new request)
//
//With middleware: new request -> do something -> run route handler (The behavior of the server is customized, a new request comes in then we run a function setup to do whatever we like e.g. log some statistics about the login request or check if there is a valid auth token, then we run the route handler)
//

//index.js
//Run the custom middleware
//the callbackfn is what will run in the "Do something" b4 route are matched
app.use((req, res, next) => {
  //new request : - This is done from POSTMAN

  //DO SOMETHING
  //req.method : type of request method e.g. POST, GET
  //req.path : route url
  console.log(req.method, req.path);
  //run the route handler
  next();
});

/*Running the app and sending a GET request in POSTMAN, we get the response and also get the request method and path in the terminal

GET /users/5d715ef92853200fbce15022

 */

/*Now we might not want to call on next() if authentication fails, and we can explore this. For this scenario, we will setup a message to tell users they cannot send a GET request if they send GET, but if they send other type of requests, things will work*/
app.use((req, res, next) => {
  if (req.method === "GET") {
    res.send("GET requests are disabled!");
  } else {
    next();
  }
});

/*Now if we send a GET request, we get the message we declared and the request was not send to the route, and when we send a POST request, the request was executed.*/

/*CHALLENGE : - Setup middleware for maintenance mode
 * 1-  Register a new middle function
 * 2-  Send back a maintenance message with a 503 status code
 * 3-  Try your requests from server and confirm status/message shows.*/

//Maintenance mode middleware (MY SOLUTION)
app.use((req, res, next) => {
  if (req.method === "GET") {
    res.status(503).send("Website is currently undergoing maintenance!");
  } else {
    next();
  }
});

/*MEAD SOLUTION*/
//Maintenance mode middleware
app.use((req, res) => {
  res.status(503).send("Website is currently undergoing maintenance!");
});
