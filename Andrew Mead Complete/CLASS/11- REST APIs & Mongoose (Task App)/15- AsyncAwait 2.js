/*HERE WE WILL MOVE TO THE PLAYGROUND DIRECTORY INSIDE OUR "task-manager" AND WE WILL CONVERT OUR "promise-chaining.js" CODE FROM PROMISE TO ASYNC/AWAIT*/

//PREVIOUS CODE WITH PROMISE CHAINING
require("../src/db/mongoose");
const User = require("../src/models/users");
/**/

User.findByIdAndUpdate("5d715ef92853200fbce15022", { age: 1 })
  .then(user => {
    console.log(user);
    //2nd async operation counts the number of documents have age of 1
    return User.countDocuments({ age: 1 });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });

//REFACTORED CODE WITH ASYNC/AWAIT CHAINING
//loading our mongoose.js file where we connect to database
require("../src/db/mongoose");
//loading in the user model
const User = require("../src/models/users");
/**/

//We want to get the user id and update their age so we take both id & age as args
const updateAgeAndCount = async (id, age) => {
  //AsyncAwait chaining
  const user = await User.findByIdAndUpdate(id, { age: age });
  const count = await User.countDocuments({ age: age });
  return count;
};
//we call the function and we pass the id and the value we want to change the age to
updateAgeAndCount("5d715ef92853200fbce15022", 2)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });

/*CHALLENGE : Use async/await
 * 1-  Create deleteTaskAndCount as an async function
 *       Accept id of task to remove
 *2-   Use await to delete task and count up incomplete tasks
 * 3-  Return the count
 * 4-  Call the function and attach then/catch to log results
 * 5-  Test your work!
 * */

//PREVIOUS CODE WITH PROMISE CHAINING
//loading our mongoose.js file where we connect to database
require("../src/db/mongoose");
//loading in the user model
const Task = require("../src/models/tasks");
/**/

Task.findByIdAndDelete("5d717b964a5df6241c14751b")
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });

//REFACTORED CODE WITH ASYNC/AWAIT CHAINING
//loading our mongoose.js file where we connect to database
require("../src/db/mongoose");
//loading in the user model
const Task = require("../src/models/tasks");
/**/

/*Task.findByIdAndDelete("5d717b964a5df6241c14751b")
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });*/

const deleteTaskAndCount = async id => {
  const taskToDelete = await Task.findByIdAndDelete(id);
  const countIncompleteTask = await Task.countDocuments({ completed: false });
  return countIncompleteTask;
};

deleteTaskAndCount("5d7152d777076a0a9071b531")
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
