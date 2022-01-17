/*In this lesson, we will learn how to setup http endpoint to delete resources/documents.*/

//DELETING A USER BY ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedUser);
  } catch (e) {
    res.status(500).send();
  }
});

//DELETING A TASK BY ID
app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskToDelete = await Task.findByIdAndDelete(req.params.id);
    res.status(200).send(taskToDelete);
  } catch (e) {
    res.status(500).send();
  }
});
