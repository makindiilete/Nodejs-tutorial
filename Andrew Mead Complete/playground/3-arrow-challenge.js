const tasks = {
  task: [
    {
      text: "Grocery shopping",
      completed: true
    },
    {
      text: "Clean yard",
      completed: false
    },
    {
      text: "Film course",
      completed: false
    }
  ],
  //ES6 function shorthand
  getTasksToDo() {
    return this.task.filter(task => task.completed === false);
  }
};
console.log(tasks.getTasksToDo());
