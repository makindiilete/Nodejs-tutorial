//We use the http module for creating networking applications for example, we can create a web server that listens for http requests on a given port and with this we can easily create a backend service for client applications like a web app that we built with react or angular or mobile application running on a mobile device.

/*Back again in the node Docs, you can find the HTTP in the node modules and under it you can see various classes like
 * Http.Agent
 * http.ClientRequest
 * etc...
 * Each of this classes has properties, methods and events.*/

//EXAMPLE
const http = require("http");
//we create our server where the server is an event emitter, having all the capabilities of the event emitter.
const server = http.createServer();
//we call our server variable and give it the 'listen' method and pass a port it listens to as argument.
server.listen(3000);
console.log("Listening on port 3000...");

//RESULT : - Running this we get "Listening on port 3000...."

/*Anytime there is a new connection or new request, the server raises an event so we can use the 'on/addListener' method to handle that event. So before 'server.listen', we want to register a listener*/

const http = require("http");

//we create our server where the server is an event emitter, having all the capabilities of the event emitter.
const server = http.createServer();

//Register a listener....'all this parameters are in the docs so you dont need to memorise'
server.addListener("connection", socket => {
  console.log("New connection...");
});

//we call our server variable and give it the 'listen' method and pass a port it listens to as argument.
server.listen(3000);

console.log("Listening on port 3000...");

/*If we run the app, we still get 'Listening on port 3000....' but if we go to the browser and navigate to 'localhost:3000', the event listening kicks in and we get the result below*/

/*Listening on port 3000...
New connection...*/

//In real world app, we wont respond to the connection event to build an http service, this is very low level so we can get rid of the listener. So the better way of doing it is this

const http = require("http");

//We create server and we pass two parameters (request & response)
const server = http.createServer((req, res) => {
  //we check if the url of the request is '/',
  if (req.url === "/") {
    //we send a response 'res' to the client 'Hello Client' which will be sent to the client browser
    res.write("Hello Client");
    //We then end the response
    res.end();
  }
});

//we call our server variable and give it the 'listen' method and pass a port it listens to as argument.
server.listen(3000);

console.log("Listening on port 3000...");

//When we run the app again and refresh the page, we get the messge 'Hello Client' displayed in the browser.

/*To build a backend service for our web or mobile apps, we need to handle various routes */

//Adding a routes to display list of courses in the database if the client navigates to '/api/courses/'

const http = require("http");

//We create server and we pass two parameters (request & response)
const server = http.createServer((req, res) => {
  //VARIOUS ROUTES
  if (req.url === "/") {
    res.write("Hello Client");
    res.end();
  }
  //Creating another route to return list of courses in the database if the url is '/api/courses'
  if (req.url === "/api/courses") {
    //here we want to return an array of objects through json.
    //"Json.stringify' will convert the values enter to json strings
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

//we call our server variable and give it the 'listen' method and pass a port it listens to as argument.
server.listen(3000);

console.log("Listening on port 3000...");

//IF WE RE-RUN THE APP AND NAVIGATE TO 'localhost:3000/api/courses', we get
/*
*
  [
1,
2,
3
]

*/

/*So as we can see, building web server with node is very easy but in a real world app, we will not be using the http module to build backend service for our app. The reason for this is as we add more routes, the code gets more complex so instead we use a framework called express which gives our application a clean structure to handle various routes.
 * Internally, the express is built on top of http module in node*/

// A SELF TEST TO CREATE A HTTP ROUTE THAT DISPLAYS FAMILY MEMBERS NAMES

const http = require("http");

//We create server and we pass two parameters (request & response)
const server = http.createServer((req, res) => {
  //VARIOUS ROUTES
  if (req.url === "/") {
    res.write("Hello Client");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
  //This route displays the family members
  if (req.url === "/api/family") {
    res.write(
      JSON.stringify([
        { id: 1, Name: "Michaelz Omoakin" },
        { id: 2, Name: "Abiodun Akindiilete" },
        { id: 3, Name: "Abimbola Akindiilete" },
        { id: 4, Name: "Ayobami Akindiilete" },
        { id: 5, Name: "Eunice Akindiilete" },
        { id: 6, Name: "Iyanu Akindiilete" },
        { id: 7, Name: "Oluwayemisi Akindiilete" },
        { id: 8, Name: "Oluwaferanmi Akindiilete" }
      ])
    );
    res.end();
  }
});

//we call our server variable and give it the 'listen' method and pass a port it listens to as argument.
server.listen(3000);

console.log("Listening on port 3000...");

//RESULT

/*
* [
{
id: 1,
Name: "Michaelz Omoakin"
},
{
id: 2,
Name: "Abiodun Akindiilete"
},
{
id: 3,
Name: "Abimbola Akindiilete"
},
{
id: 4,
Name: "Ayobami Akindiilete"
},
{
id: 5,
Name: "Eunice Akindiilete"
},
{
id: 6,
Name: "Iyanu Akindiilete"
},
{
id: 7,
Name: "Oluwayemisi Akindiilete"
},
{
id: 8,
Name: "Oluwaferanmi Akindiilete"
}
]*/
