/*Now we will be using jest to test one of our endpoints. There are two ways to get this done : -
1-  To actually start up the express server on port 3000 >>> We will then use an http request library like the one we use with the weather app to make real requests to our api from code then we could make assertions about their response seeing if it is correct or not.
The express team actually released their own library that made this easier to do. It is called "supertest". So we install npm supertest library.
*/

/*
TESTING THE TASK MANAGER APP : - Now we want to focus on creating tests for the task manager app, so we will create a new test file with appropriate name in the test dir. So we start by creating "user.tests.js" for testing users functionality for our task manager app

1-  We start by loading the supertest module
//loading supertest library
const request = require("supertest");

2-  Now we want to get access to our express app but we dont want to call app.listen. So we want to access the express app before "listen" is called. At the moment that is a problem because our express app is defined inside "index.js" [const app = express()] and then we have app.listen called down below the file. So we cannot access this app in our "user.test.js" without calling on app.listen. So we need to do a little refactoring across "index.js" & "user.test.js" so we can access the app without calling app.listen.
3-  Create a separate file in the src dir "app.js"
4-  Copy everything from index.js to app.js
5-  We remove the app.listen code from the pasted code in app.js because we dont want to call on listen there
6-  We then export the app
7-  We also remove the "port" variable.
8-  So now our app.js creates the app
*/

//app.js
//EXTERNAL ROUTES
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

//loading our mongoose.js file where we connect to database
require("./db/mongoose");
/*Creating our server*/
const express = require("express");
const app = express();

app.use(express.json()); //passing json to obj automatically
app.use(userRouter); //registering our userRouter
app.use(taskRouter); //registering our taskRouter

//
//Without middleware: new request -> run route handler
//
//With middleware: new request -> do something -> run route handler
//

module.exports = app;

//index.js
//1-  We load in the app
const app = require("./app");

//2-  We define our port
const port = process.env.PORT;

//
//Without middleware: new request -> run route handler
//
//With middleware: new request -> do something -> run route handler
//

//3-  Then we call on listen
app.listen(port, () => {
  console.log("Server is up and running on " + port);
});
/**/

/*CREATING OUR FIRST SIGN UP USER TEST : - Now we can create our first test to test the signup route*/

//user.test.js
//loading supertest library
const request = require("supertest");
//loading our app
const app = require("../src/app");

//Test to test signup route using POST /users
test("Should signup a new user", async () => {
  //we pass our app to the request fn and await it >>> then we define the http method dt sud b use for the test >>> then we define the path for the route >>> We then use ".send" to send a object containing the sign up information we want to use to perform the sign up test. >>> we then pass in our assertions using the status code we are expecting.
  await request(app)
    //method & route path
    .post("/users")
    //user object
    .send({
      name: "Michaelz",
      email: "akindiileteforex@gmail.com",
      password: "123999abc"
    })
    //assertions
    .expect(201);
});

/*Now if we run our app, we got all our tests passed and if we check the db, we can see that the object we passed to ".send()" was indeed used to create a new user under a new database collection "task-manager-api-test"

//PROBLEM WITH THE CURRENT IMPLEMENTATION
There is a problem with our current implementation and this is, if we try to re-run the tests by pressing "a", the test will fail because it tries to create a new user with the same details which already exist.

So to fix this, we need to write a bit of code to tell jest to be wiping existing data in the database before running a new test case so our test cases wont run fine once and fail later because of what the previous test did to the database.
*/
