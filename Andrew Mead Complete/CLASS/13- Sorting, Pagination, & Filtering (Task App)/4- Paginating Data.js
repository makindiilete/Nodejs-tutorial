/*Now we will continue to expand on our GET TASKS request adding more options that the user of the api can use.
- Already we have added option to be able to filter the request they get back by the value of the "completed" field.
- We will add another option to the get tasks request and that will be pagination.

PAGINATION EXAMPLES : -
The best example is if we search for something on google, we might get over 5million results but all this 5million results will not be displayed on the google result page, instead we will get only the first 10 results on the first page and we can click on the page number below to search to go to other pages to fetch other results.

So pagination allows you to break what you are sending back into pages so you do not send all at once and have ability to load more data using either of the 3 approaches : -
1-  click on page numbers to load more,
2-  there can also be a button instead of page numbers that also allows you to load more.
3-  Infinite data tech which instagram, facebook uses to automatically fetch more data when you get to the bottom of the page.

No matter the approach you choose to use, the backend will stay the same, we need a way to make users requesting their tasks to specify which page of data they are trying to fetch using two options "limit & skip"*/

/*GET TASKS WITH VARIOUS OPTIONS: -
 * 1-  All tasks, completed tasks only OR uncompleted tasks only. (GET/tasks?completed=true)
 * 2-  Pagination : (GET /tasks?limit=10&skip=0) We apply pagination by giving user ability to add another query string to set limit of the tasks dt gt returned via "limit=10" and to also move from page to page via skip (skip=0 === 1st page, skip=10 === 2nd page, skip=20 === 3rd page) */
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
        match,
        //  option property for pagination (and sorting)
        options: {
          //limiting the tasks we send back to 2
          limit: 2
        }
      })
      .execPopulate();
    res.send(req.user.userTasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*Now that we have set out limit to 2 on the backend, even if we have 400 tasks, we will always get 2 back at once but instead of hardcoding the limit value, we can allow users to set that via query string*/

//router/tasks.js
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

/*GET TASKS WITH VARIOUS OPTIONS: -
 * 1-  All tasks, completed tasks only OR uncompleted tasks only. (GET/tasks?completed=true)
 * 2-  Pagination : (GET /tasks?limit=10&skip=0) We apply pagination by giving user ability to add another query string to set limit of the tasks dt gt returned via "limit=10" and to also move from page to page via skip (skip=0 === 1st page, skip=10 === 2nd page, skip=20 === 3rd page) */
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
        match,
        //  option property for pagination (and sorting)
        options: {
          //this allows the user to limit the tasks result while parseInt helps convert the limit query string to interger
          limit: parseInt(req.query.limit),
          //this allows the user to get the next page (parseInt) helps in converting the skip query string value to integer which is what mongoose expects
          skip: parseInt(req.query.skip)
        }
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

/*Now if we head over to POSTMAN and try to start messing with out skip and limit.

url === {{url}}/tasks?limit=0&skip=0 -> This returns all the tasks bcos setting both limit & skip to 0 is like disabling them
url === {{url}}/tasks?limit=1&skip=0 -> limit the result to only the first task (limit = 1) and skip none (skip = 0)
url === {{url}}/tasks?limit=1&skip=1 -> skips the first task (skip = 1) and display only the second tasks (limit = 1)
url === {{url}}/tasks?limit=1&skip=2 -> skips the first 2 tasks (skip = 2) and display only the 3rd tasks (limit = 1)
*/
