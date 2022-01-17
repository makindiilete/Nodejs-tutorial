/*In this video, we will complete a challenge using promise chaining.
CHALLENGE : - Mess Around with promise chaining
1-  Create promise-chaining-2.js
2-  Load in mongoose and task model
3-  Remove a given task by id
4-  Get and print the total number of incomplete tasks
5-  Test your work*/

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
