/*Now that we have a relationship setup between users and their tasks, in this video, we will headed over to the task router to add authentication to those task routes*/

/*FETCH A TASK CREATED BY THE LOGGED IN USER : - Here we still going to allow the logged in user to use a task id to fetch the task related to that id as long as they are the one who created it*/
router.get("/tasks/:id", auth, async (req, res) => {
  //we use req.params.id to check the id we pass in the url and take the value to check for matching _id in the database
  const _id = req.params.id;
  try {
    // const task = await Task.findById(_id); (THIS WAS THE PREVIOUSLY USED CODE WHICH JUST FIND A TASK BY ID AND RETURN IT WITHOUT VERIFYING WHO OWNS IT)

    //here we use findOne to find Task having the id in the url params and also the task must also have the value of the owner's field set to the id of the currently logged user which is inside "req.user._id" from our auth.js middleware
    const task = await Task.findOne({ _id: _id, owner: req.user._id });
    //if there are no task by the url params which was also created by the logged in user, we return 404 error
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

/*Now if we setup two new users and creates two tasks under each account and then try to use the task id to fetch the task, we see that we are only able to fetch the task created by each user*/

/*CHALLENGE : - Refactor GET /tasks
 * 1-  Add authentication
 * 2-  Return tasks only for the authenticated user
 * 3-  Test your work*/

//GET/RETURN/FETCH ARRAY OF ALL THE TASKS THE CURRENTLY LOGGED IN USER HAS CREATED IN THE DATABASE
router.get("/tasks", auth, async (req, res) => {
  try {
    //this finds all the tasks associated with the owner field value stored as the id of the logged in user
    const tasks = await Task.find({ owner: req.user._id });
    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

//routers/task.js

const express = require("express");
const router = new express.Router();
//loading in the task model
const Task = require("../models/task");
//loading the auth middleware
const auth = require("../middleware/auth");

//CREATE TASK
router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    //we use spread operator to copy/ref all the properties provided in the body of the request (description, completed)
    ...req.body,
    //we then provide the owner of the task which is the currently logged in user
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET/RETURN/FETCH ARRAY OF ALL THE TASKS THE CURRENTLY LOGGED IN USER HAS CREATED IN THE DATABASE
router.get("/tasks", auth, async (req, res) => {
  try {
    //this finds all the tasks associated with the owner field value stored as the id of the logged in user
    const tasks = await Task.find({ owner: req.user._id });
    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*FETCH A TASK CREATED BY THE LOGGED IN USER BY THE TASK ID: - Here we still going to allow the logged in user to use a task id to fetch the task related to that id as long as they are the one who created it*/
router.get("/tasks/:id", auth, async (req, res) => {
  //we use req.params.id to check the id we pass in the url and take the value to check for matching _id in the database
  const _id = req.params.id;
  try {
    // const task = await Task.findById(_id); (THIS WAS THE PREVIOUSLY USED CODE WHICH JUST FIND A TASK BY ID AND RETURN IT WITHOUT VERIFYING WHO OWNS IT)

    //here we use findOne to find Task having the id in the url params and also the task must also have the value of the owner's field set to the id of the currently logged user which is inside "req.user._id" from our auth.js middleware
    const task = await Task.findOne({ _id: _id, owner: req.user._id });
    //if there are no task by the url params which was also created by the logged in user, we return 404 error
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

//UPDATING A TASK CREATED BY THE LOGGED IN USER
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    //we find the task under the url params id which has their owner field value equals to "req.user._id"
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//DELETING A TASK CREATED BY THE LOGGED IN USER BY THE TASK ID
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const taskToDelete = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!taskToDelete) {
      return res.status(404).send();
    }
    res.status(200).send(taskToDelete);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
