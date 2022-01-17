/*Here we will be taking a challenge to define a new mongoose model and actually use it.

When we create a new Model, we are simply creating a new mongodb collection
When we create a new instance of the model, we are simply inserting new document to the created collection.
Our Model name should be created in singular format with the sentence case. "User, Task" but when we save it, mongodb converts it to plural and in lowercase

CHALLENGE : - Create a model for tasks
1-  Define the model with description and completed fields
2-  Create a new instance of the model
3-  Save the model to the database
4-  Test your work.*/

const mongoose = require("mongoose");
//mongoose connecting to db. "mongodb://127.0.0.1:27017/" is the url, "/task-manager-api" is the name of the database we want to create and connect to
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
  useCreateIndex: true
});

//TASK MODEL
const Task = mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

//Creating the task document/instance
const task = new Task({
  description: "Check Forex Currency Strength",
  completed: false
});

//Saving to db
task
  .save()
  .then(task => {
    console.log(task);
  })
  .catch(error => {
    console.log("Error ", error);
  });

/*{ _id: 5d714e4a0cae692b102d08b4,
  description: 'Check Forex Currency Strength',
  completed: false,
  __v: 0 }*/
