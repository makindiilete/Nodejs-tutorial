/*Now we will add another option to allow users get their tasks sorted in a specific order.

SORTING ORDER AVAILABLE
* 1-  They can sort by the createdAt field
* 2-  updatedAt field
* 3-  completed field*/

/*HARD-CODING THE SORTING VALUE*/

/*GET TASKS WITH VARIOUS OPTIONS: -
 * 1-  All tasks, completed tasks only OR uncompleted tasks only. (GET/tasks?completed=true)
 * 2-  Pagination : (GET /tasks?limit=10&skip=0) We apply pagination by giving user ability to add another query string to set limit of the tasks dt gt returned via "limit=10" and to also move from page to page via skip (skip=0 === 1st page, skip=10 === 2nd page, skip=20 === 3rd page)
 * 3- Sorting :  This allows the consumer specify the sorting criteria using any of the fields in the database and also specify either ascending (newset -> oldest) or descending order (oldest -> newest) (GET /tasks?sortBy=createdAt_desc).*/
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
          skip: parseInt(req.query.skip),
          //  sorting criteria
          sort: {
            //d field in d db to use
            createdAt: -1 //ascending = 1 == newest -> oldest, descending = -1 == oldest to newest
            // completed: 1 //ascending = 1 == false -> true, descending = -1 == true -> false
          }
        }
      })
      .execPopulate();
    res.send(req.user.userTasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*SORTING VIA VALUE FROM QUERY STRING
Allowing users to sort by the value they provided in the query string will be similar to how we used "match" to filter the returned results by the query string the user provided : -
1-  User that do not provide any query get all tasks
2-  Those that provide query set to true gets all completed tasks
3-  Those that provide query set to false gets all incompleted tasks.

SAME WAY FOR OUR SORTING
1-  User that do not provide any query for sorting get all their tasks without sorting.
2-  Those who provides query with sorting criteria and descending get their sorted data in descending order
3-  Those who provides query with sorting criteria and ascending get their sorted data in ascending order*/

/*GET TASKS WITH VARIOUS OPTIONS: -
 * 1-  All tasks, completed tasks only OR uncompleted tasks only. (GET/tasks?completed=true)
 * 2-  Pagination : (GET /tasks?limit=10&skip=0) We apply pagination by giving user ability to add another query string to set limit of the tasks dt gt returned via "limit=10" and to also move from page to page via skip (skip=0 === 1st page, skip=10 === 2nd page, skip=20 === 3rd page)
 * 3- Sorting :  This allows the consumer specify the sorting criteria using any of the fields in the database and also specify either ascending (newset -> oldest) or descending order (oldest -> newest) (GET /tasks?sortBy=createdAt_desc OR /tasks?sortBy=createdAt:desc).*/
router.get("/tasks", auth, async (req, res) => {
  //PAGINATION
  //this is used to filter tasks base on completed value
  const filterTasks = {};
  //here we are saying, if a query string is provided in the url
  if (req.query.completed) {
    //we sud return all tasks dt have their completed value set to the value of the query string.
    filterTasks.completed = req.query.completed;
    // match.completed = req.query.completed === "true";
  }

  //SORTING
  //this is used to sort tasks
  const sortTasks = {};
  //if the sortBy is provided as query string
  if (req.query.sortBy) {
    //we create a variable that breaks the string "sortBy:desc" into two different array element using the : that divides them so they will be parts = ["sortBy", "desc"]
    const parts = req.query.sortBy.split(":");
    //now we pick the first element of the array which is "sortBy" and we set its value to -1 if the value of the query string sortBy is "desc" else we set sortBy to sort by 1 .
    sortTasks[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    //here we use a new way to fetch tasks created by the currently logged in user via the populate method
    await req.user
      .populate({
        //path here is the name we used to create the virtual USER -> TASKS relationship
        path: "userTasks",
        //here we specify dt the tasks returned must match the value of "match.completed" which we have set to the value of the query string (req.query.completed) on line 31
        filterTasks,
        //  option property for pagination (and sorting)
        options: {
          //this allows the user to limit the tasks result while parseInt helps convert the limit query string to interger
          limit: parseInt(req.query.limit),
          //this allows the user to get the next page (parseInt) helps in converting the skip query string value to integer which is what mongoose expects
          skip: parseInt(req.query.skip),
          //  sorting criteria
          sortTasks
        }
      })
      .execPopulate();
    res.send(req.user.userTasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

//routers.tasks.js
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
 * 2-  Pagination : (GET /tasks?limit=10&skip=0) We apply pagination by giving user ability to add another query string to set limit of the tasks dt gt returned via "limit=10" and to also move from page to page via skip (skip=0 === 1st page, skip=10 === 2nd page, skip=20 === 3rd page)
 * 3- Sorting :  This allows the consumer specify the sorting criteria using any of the fields in the database and also specify either ascending (newset -> oldest) or descending order (oldest -> newest) (GET /tasks?sortBy=createdAt_desc OR /tasks?sortBy=createdAt:desc).*/
router.get("/tasks", auth, async (req, res) => {
  //PAGINATION
  //this is used to filter tasks base on completed value
  const filterTasks = {};
  //here we are saying, if a query string is provided in the url
  if (req.query.completed) {
    //we sud return all tasks dt have their completed value set to the value of the query string.
    filterTasks.completed = req.query.completed;
    // match.completed = req.query.completed === "true";
  }

  //SORTING
  //this is used to sort tasks
  const sortTasks = {};
  //if the sortBy is provided as query string
  if (req.query.sortBy) {
    //we create a variable that breaks the string "sortBy:desc" into two different array element using the : that divides them so they will be parts = ["sortBy", "desc"]
    const parts = req.query.sortBy.split(":");
    //now we pick the first element of the array which is "sortBy" and we set its value to -1 if the value of the query string sortBy is "desc" else we set sortBy to sort by 1 .
    sortTasks[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    //here we use a new way to fetch tasks created by the currently logged in user via the populate method
    await req.user
      .populate({
        //path here is the name we used to create the virtual USER -> TASKS relationship
        path: "userTasks",
        //here we specify dt the tasks returned must match the value of "match.completed" which we have set to the value of the query string (req.query.completed) on line 31
        filterTasks,
        //  option property for pagination (and sorting)
        options: {
          //this allows the user to limit the tasks result while parseInt helps convert the limit query string to interger
          limit: parseInt(req.query.limit),
          //this allows the user to get the next page (parseInt) helps in converting the skip query string value to integer which is what mongoose expects
          skip: parseInt(req.query.skip),
          //  sorting criteria
          sortTasks
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
