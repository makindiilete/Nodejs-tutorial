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
