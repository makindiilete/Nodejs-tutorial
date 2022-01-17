/*We will focus on setting up helpful options for the consumer of our api to use. This options will help them to better target the data they are trying to fetch.
The only route we will be focusing on is the "router.get" route inside the task.js router where you can fetch all of your route.
WHY?
Even though we have dozen of routes, all other routes returns a single data, it is only the get tasks route that returns an array of all tasks created by the user which can be so many in the database for example if a user has been using the app for years and creating task each day, so fetching all of them will do two things : -
1-  It will be slow because of the amount of document.
2-  It will fetch many documents the user will not actually use.
So we will setup helpful options to filter the tasks we return so user will be able to better target the data they want to get.

We wll do this using QUERY STRING as part of the url structure. We already used the query string in our weather app.

So with the modification in the GET /tasks, user can still fetch all of the tasks they have created but if they want, they can add a query string to fetch only completed tasks via (/tasks?completed=true) to fetch all the tasks you have completed OR (/tasks?completed=false) to get all the tasks you still need to do.*/

//GET EITHER ALL TASKS CREATED, ALL COMPLETED OR UNCOMPLETED TASKS
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  //here we are saying, if a query string is provided in the url
  if (req.query.completed) {
    //we sud return all tasks dt have their completed value set to the value of the query string.
    match.completed = req.query.completed;
    // match.completed = req.query.completed === "true";
  }
  try {
    //here we use a new way to fetch tasks created by the currently logged in user via the populate method
    await req.user
      .populate({
        //path here is the name we used to create the virtual USER -> TASKS relationship
        path: "userTasks",
        //here we specify dt the tasks returned must match the value of "match.completed" which we have set to the value of the query string (req.query.completed) on line 31
        match
      })
      .execPopulate();
    res.send(req.user.userTasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

//routers/tasks.js
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

//GET EITHER ALL TASKS CREATED, ALL COMPLETED OR UNCOMPLETED TASKS
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  //here we are saying, if a query string is provided in the url
  if (req.query.completed) {
    //we sud return all tasks dt have their completed value set to the value of the query string.
    match.completed = req.query.completed;
    // match.completed = req.query.completed === "true";
  }
  try {
    //here we use a new way to fetch tasks created by the currently logged in user via the populate method
    await req.user
      .populate({
        //path here is the name we used to create the virtual USER -> TASKS relationship
        path: "userTasks",
        //here we specify dt the tasks returned must match the value of "match.completed" which we have set to the value of the query string (req.query.completed) on line 31
        match
      })
      .execPopulate();
    res.send(req.user.userTasks);
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
