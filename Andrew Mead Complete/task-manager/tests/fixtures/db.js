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
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase
};
