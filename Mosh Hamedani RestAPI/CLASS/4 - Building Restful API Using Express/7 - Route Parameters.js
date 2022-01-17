/*We will be learning how we can read the route parameters the clients enters in the address bar and display it in the browser in json*/

const express = require("express");

//this creates an express app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3, 4]);
});
//Route parameters ("id" can be any string)
// So we expecting the client to navigate to "localhost:3000/api/courses/1" - where 1 can be any number
app.get("/api/courses/:id", (req, res) => {
  //here we are sending the route parameter to the client browser
  res.send(req.params.id);
});

//setting our env variable for PORT
//this means if we have an env variable called "PORT", we use it, else we use 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

/*Now if we navigate to "/api/courses/1", in the browser, we get 1*/

//WORKING WITH MULTIPLE PARAMETERS : - In a blog for example, we may have a params like this '/api/posts/:year/:month'

const express = require("express");

//this creates an express app
const app = express();

// So we expecting the client to navigate to "localhost:3000/post/2018/2 - where '2018' can be any year and '2' can be any month number from 1 - 12 can be any number
app.get("/api/post/:year/:month", (req, res) => {
  //here we are sending the route parameter to the client browser
  res.send(req.params);
});

//setting our env variable for PORT
//this means if we have an env variable called "PORT", we use it, else we use 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

//RESULT : -
/*
{
year: "2018",
month: "1"
* */

//WORKING WITH QUERY STRING : - This are parameters after the question mark e.g. "localhost:3000/api/posts/2018/1?sortBy=name"
/*This simply means we should get all the posts in January 2018 and sort them by their names*/

//USES
/*1) Route parameters - This are used for essentials and required values
 * 2) Query string parameters - We use this to provide additional data to our backend services, we use it for anything that is optional*/

//SAMPLES
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3, 4]);
});
//Route parameters ("id" can be any string)
app.get("/api/post/:year/:month", (req, res) => {
  //here we are sending the query parameter to the client browser
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

//RESULT
/*address : - "http://localhost:5000/api/post/2018/1?sortBy=name"
{
sortBy: "name"
}
*/
