const mongoose = require("mongoose");
//loading our validator package
const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    //this stores the owner of the task
    owner: {
      //this says d data stored under owner will be an objectId
      type: mongoose.Schema.Types.ObjectId,
      //this means if you are creating a task, u must provide the owner. (You cannot create an anonymous task)
      required: true,
      //  here we are referencing the "User" model from inside the Task (This will allow us to be able to fetch the entire User profile whenever we have individual task)
      ref: "User"
    }
  },
  //Adding our timestamp object
  {
    timestamps: true
  }
);

//TASK MODEL
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
// export default Task;
