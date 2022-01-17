/*We already setup a test case that test an express api endpoint, now it work the first time and failed the second time. It failed the second time because the email was already registered in the db the first time it ran.
GOAL : - We will learn how to use Jest lifecycle methods to run some code just before or after a test case. That will allows us to run some code that clears the database so our test cases can consistently executes as expected.
You can learn more about this in the Jest docs >>> Introduction >>> Setup and Teardown.*/

//BEFORE EACH & AFTER EACH
//loading supertest library
const request = require("supertest");
//loading our app
const app = require("../src/app");

//This function runs before each test case in this test suites (ds fn is one of d lifecycle provided by jest)
beforeEach(() => {
  console.log("beforeEach");
});

//this function runs after each of our test cases in ds suites
afterEach(() => {
  console.log("afterEach");
});

//Test to test signup route using POST /users
test("Should signup a new user", async () => {
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

/*Now if we save the file, the test still fails but we now get our console.log messages which means all is working well.....We can now replace the console.log msgs to something meaningful.*/

//loading supertest library
const request = require("supertest");
//loading our app
const app = require("../src/app");
//loading the user model
const User = require("../src/models/user");

//This function runs before each test case in this test suites (ds fn is one of d lifecycle provided by jest)
beforeEach(async () => {
  //ds deletes all users documents in the database b4 each test is run
  await User.deleteMany();
});

//Test to test signup route using POST /users
test("Should signup a new user", async () => {
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

/*Now if we save the file, re-run the tests, our test keep working because we now wipe our database before running a new tests.

Wiping the database so we start each test from a clean state is good but there are certain scenario where this can also cause problem e.g. To log in a user, we need some user details in the database for us to choose for testing.
So we start by wiping the database >>> Then we add a user in to be used for the login test cases >>>*/

//user.test.js
//loading supertest library
const request = require("supertest");
//loading our app
const app = require("../src/app");
//loading the user model
const User = require("../src/models/user");

//we will be using ds user object to create a new user in d db after we wipe d db so we can test for routes dt needs existing db user data, Ds will work bcos d details here is not conflicting with the details we used in the sign-up test.
const userOne = {
  name: "Mayowa",
  email: "gentlemayor@gmail.com",
  password: "123999abc"
};

//This function runs before each test case in this test suites (ds fn is one of d lifecycle provided by jest)
beforeEach(async () => {
  //ds deletes all users documents in the database b4 each test is run
  await User.deleteMany();
  //after we wipe our database, we go ahead and create ds new user using d user object above so we can use it for testing routes dt requires users data in d db like login
  await new User(userOne).save();
});

//Test to test signup route using POST /users
test("Should signup a new user", async () => {
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

//Test to test login route POST /users/login
test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
});

/*Now if we run our test, all tests are passing successfully*/

/*CHALLENGE : - Test login failure
 * 1-  Create "Should not login nonexistent user
 * 2-  Send off the request with bad credentials
 * 3-  Expect the correct status response
 * 4-  Test your work*/

//Test login with invalid credentials
test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    //ds are invalid/nonexistent user details we r testing with
    .send({
      email: "chioma@sahel.com",
      password: "123abc"
    })
    .expect(400);
});

/*This passed successfully*/

//user.test.js
//loading supertest library
const request = require("supertest");
//loading our app
const app = require("../src/app");
//loading the user model
const User = require("../src/models/user");

//we will be using ds user object to create a new user in d db after we wipe d db so we can test for routes dt needs existing db user data, Ds will work bcos d details here is not conflicting with the details we used in the sign-up test.
const userOne = {
  name: "Mayowa",
  email: "gentlemayor@gmail.com",
  password: "123999abc"
};

//This function runs before each test case in this test suites (ds fn is one of d lifecycle provided by jest)
beforeEach(async () => {
  //ds deletes all users documents in the database b4 each test is run
  await User.deleteMany();
  //after we wipe our database, we go ahead and create ds new user using d user object above so we can use it for testing routes dt requires users data in d db like login
  await new User(userOne).save();
});

//Test to test signup route using POST /users
test("Should signup a new user", async () => {
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

//Test to test login route POST /users/login
test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
});

//Test login with invalid credentials
test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    //ds are invalid/nonexistent user details we r testing with
    .send({
      email: "chioma@sahel.com",
      password: "123abc"
    })
    .expect(400);
});
