/*In this lesson, we have a single goal : -
 * * To create some more interesting task data to work with. Right now, we create a user and set them up in the database and the user object we created (db.js) allows us to test things like the login functionality, we want to make sure we do something similar with task, so we can test those other endpoints as well like the GET, PATCH, DELETE routes that needs existing task data in the database before the can work. So we are going to make a modification into our "db.js"*/

//db.js
//loading jwt for our token
const jwt = require("jsonwebtoken");
//loading mongoose to generate our own object id
const mongoose = require("mongoose");
//loading the user model
const User = require("../../src/models/user");
//loading in the task model
const Task = require("../../src/models/task");

//we will be using ds user object to create a new user in d db after we wipe d db so we can test for routes dt needs existing db user data, Ds will work bcos d details here is not conflicting with the details we used in the sign-up test.

//we create d id variable so we can use the id ahead of time before the user is created to access the token
const userOneId = new mongoose.Types.ObjectId();

/*This user object will be usd for finding user in login, delete tests, user avatar,*/
const userOne = {
  _id: userOneId,
  name: "User One",
  email: "userone@gmail.com",
  password: "123999abc",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
};

//CREATING A SECOND USER WE CAN PLAY AROUND WITH IN THE TASK TEST SUITE
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "User Two",
  email: "usertwo@gmail.com",
  password: "123999abc",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }
  ]
};

//CREATING TASK OBJECTS TO BE USED FOR GET, DELETE & PATCH ROUTE TEST THAT NEEDS EXISTING TASK IN THE DATABASE TO MANIPULATE

//taskOne with its owner as UserOne
const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First Task",
  completed: false,
  owner: userOne._id
};

//taskTwo with its owner as UserOne
const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second Task",
  completed: true,
  owner: userOne._id
};
//taskThree with its owner as UserTwo
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third Task",
  completed: true,
  owner: userTwo._id
};

//ds function performs the same job as "beforeEach function"
const setupDatabase = async () => {
  //wiping all databases b4 running tests
  await User.deleteMany();
  await Task.deleteMany();
  //Saving new users & tasks into the db after wiping
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase
};

/*CHALLENGE : - Test GET /tasks
 * 1-  Request all tasks for user one
 * 2-  Assert the correct status code
 * 3-  Check the length of the response array is 2
 * 4-  Test your work*/

//Test for fetching userOne tasks
test("Should get tasks for user one", async () => {
  const response = await request(app)
    .get("/tasks")
    //here we pass our auth token to the test
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  //advanced assertion to confirm that userOne has two tasks
  const task = await Task.findById(userOne._id);
  expect(response.body.length).toBe(2);
});

/*CHALLENGE : - Test delete task security
 * 1-  Attempt to have the second user delete the first task (should fail)
 *         Setup necessary exports from db.js
 * 2-  Assert the failed status code
 * 3-  Assert the task is still in the database
 * 4-  Test you work*/

//TEST DELETE TASK SECURITY FOR USER TWO TO TRY DELETE TASK CREATED BY USER ONE
test("Should not allow user two to delete user one task", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`) //d route path is "/tasks/:id" where d task id will be pasted in postman or browser so here we grab the "taskOne._id" property since we are trying to make userTwo delete taskOne which was created by userOne and not him
    //here we pass our auth token to the test
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  //Advanced assertion to confirm dt taskOne is still in the db
  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
