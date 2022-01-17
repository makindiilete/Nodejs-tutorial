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
const {
  userOneId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase
} = require("./fixtures/db");

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
