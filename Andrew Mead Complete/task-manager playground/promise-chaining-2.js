//loading our mongoose.js file where we connect to database
require("../src/db/mongoose");
//loading in the user model
const Task = require("../src/models/task");
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
