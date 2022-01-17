/*We will focus on setting up our test suites to allow us to test our tasks also.

We will be creating a new test suites for task tests

1-  Delete "math.js" inside src folder and "math.test.js" inside tests dir
2-  Create a new test suite "task.test.js"... Here we will run our task tests to ensure tasks were created as we will expect.
3-  Inside the task suites, we create a our first test "Should create task for user" and inside this test, we are trying to create a task which we know we must first authenticate a user first before we can create a task and for our user authentication, inside the "user.test.js" we have been using the token property inside "userOne{}" to setup our authentication but currently inside task suite, we do not have access to this object, so we need a way to be able to re-structure the userOne & userOneId object and move it out into a separate file, so that both the user & task suite will be able to have access to it instead of user suite been the only one having access to it.

4-  We create a brand new file "db.js" in the "fixtures" folder, where we will move our userOne & userOneId to.
5-  In the "db.js" file, we wanna make sure we create the same user data we are currently using over in the "user.test.js" suite.
6-  Now inside the "db.js" file, we need a function like the beforeEach() that delete the users document in the db before running any test but we cannot cut the beforeEach function into the "db.js" file so we create a new function inside "db.js" and we cut out the same code we are running inside "beforeEach" into the function.
7-  Now inside "db.js" we need to export "userOneId, userOne & setupDatabase()" so "user.test.js" can use them.


NOTE:- Now when we have multiple test suites (user & task) each interacting with the database, there is a chance for conflict because how jest run things : - Jest will try to run tests inside our two test suites at the same time and since we are depending on some certain changes in the database, we can get into a situation where tests fails incorrectly e.g. the test fore creating a user can fail maybe in between creating a user and finding the created user in the database, another tests in a different file messes up the user maybe doing something like resetting the database.

So it is good to write test cases and to also know that our tests can interfere with each other if we let them. But we can fix this with a simple change inside package.json. All we need to do is add a new option alongside the "watch" option in the test command. So we add "--runInBand" which will ensures there are no overlaps or conflicts during running of our tests : - "test": "env-cmd ./config/test.env jest --watch --runInBand"

8-  Now shut down jest (Ctrl + C) and start it up again with arrow up & enter.
9-  Now we can complete the writing of our task test to ensure a given user can create a task.*/

//db.js
//loading jwt for our token
const jwt = require("jsonwebtoken");
//loading mongoose to generate our own object id
const mongoose = require("mongoose");
//loading the user model
const User = require("../../src/models/user");

//we will be using ds user object to create a new user in d db after we wipe d db so we can test for routes dt needs existing db user data, Ds will work bcos d details here is not conflicting with the details we used in the sign-up test.

//we create d id variable so we can use the id ahead of time before the user is created to access the token
const userOneId = new mongoose.Types.ObjectId();

/*This object will be usd for finding user in login, delete tests, user avatar,*/
const userOne = {
  _id: userOneId,
  name: "Mayowa",
  email: "omoikecatherine268@gmail.com",
  password: "123999abc",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
};

//ds function performs the same job as "beforeEach function"
const setupDatabase = async () => {
  //ds deletes all users documents in the database b4 each test is run
  await User.deleteMany();
  //after we wipe our database, we go ahead and create ds new user using d user object above so we can use it for testing routes dt requires users data in d db like login
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase
};

//user.test.js
//loading supertest library
const request = require("supertest");
//loading our app
const app = require("../src/app");
//loading the user model
const User = require("../src/models/user");
//loading items from db.js
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

//This function runs before each test case in this test suites (ds fn is one of d lifecycle provided by jest) and the code to run inside the fn is already setup as another function "setupDatabase()" inside db.js
beforeEach(setupDatabase);

//Test to test signup route using POST /users
test("Should signup a new user", async () => {
  const response = await request(app)
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
  //Advanced assertion dt checks if the new user was created successfully
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  //Assertion to check the whole response body and check if we have this key value pairs inside
  expect(response.body).toMatchObject({
    user: {
      name: "Michaelz",
      email: "akindiileteforex@gmail.com"
    },
    token: user.tokens[0].token
  });
  //Assertion to confirm that the plain text password is not stored in d db
  expect(user.password).not.toBe("123999abc");
});

//Test to test login route POST /users/login
test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
  //Fetching the user
  const user = await User.findById(userOne._id);
  //Assert that token in response matches users second token
  expect(response.body.token).toBe(user.tokens[1].token);
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

//Test for fetching users profile with auth token
test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    //here we pass our auth token to the test
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

//Testing to ensure user not authenticated cannot fetch their profiles
test("Should not get profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    //we suppose to pass our token here but we pass non so we are not authenticated
    .send()
    .expect(401);
});

//TEST FOR DELETE ACCOUNT ROUTE (VALID TOKEN/ SUCCESS CASE)
test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    //here we pass our auth token to the test
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  //Fetching the user
  const user = await User.findById(userOne._id);
  expect(user).toBeNull();
});

//TEST FOR DELETE ACCOUNT ROUTE (INVALID OR NO TOKEN/ FAILURE CASE)
test("Should not delete account for unauthenticated user", async () => {
  await request(app)
    .delete("/users/me")
    //here we pass no auth token to the test
    .send()
    .expect(401);
});

//Upload user avatar test
test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    //to upload a file, we use "attach()" with 2 args, the property name (avatar) and the path to the file
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
  //Assertion to confirm dt binary data was indeed stored in d db
  const user = await User.findById(userOne._id);
  //ds checks if user.avatar is of type "Buffer" in the db. U can use d syntax below to check for "string,number" etc.
  expect(user.avatar).toEqual(expect.any(Buffer));
});

//Valid user update test
test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Omoakin"
    })
    .expect(200);
  //Advanced assertion to check if the user.name === "Omoakin"
  const user = await User.findById(userOne._id);
  expect(user.name).toEqual("Omoakin");
});

//Invalid user update test
test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    //trying to update invalid field
    .send({
      location: "Ibeju-lekki"
    })
    .expect(400);
});

//task.test.js
//loading supertest library
const request = require("supertest");
//loading jwt for our token
const jwt = require("jsonwebtoken");
//loading mongoose to generate our own object id
const mongoose = require("mongoose");
//loading our app
const app = require("../src/app");
//loading the user model
const Task = require("../src/models/task");
//loading items from db.js
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

//This function runs before each test case in this test suites (ds fn is one of d lifecycle provided by jest) and the code to run inside the fn is already setup as another function "setupDatabase()" inside db.js
beforeEach(setupDatabase);

//Testing for task creation
test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    //JWT auth
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    //the task body
    .send({
      description: "From my test"
    })
    .expect(201);
  //advanced assertion to find the task created and confirm it is correct. (we fetched d id from reponse.body because it is a newly created task just like we did with newly created user)
  const task = await Task.findById(response.body._id);
  //checking d task is created
  expect(task).not.toBeNull();
  //checking the completed property is "false"
  expect(task.completed).toEqual(false);
  // expect(task.completed).toBe(false)
});

/*Now if we run the app, we have "11 passed, 11 total"*/
