/*Whenever you see the error message "UnhandledPromiseRejectionWarning", it means you are dealing with async code with a rejected promise which you did not handle. So we sud wrap that specific handler in a try catch block......

So we need to add the get request of our genres handler in a try catch block*/

//genres_route.js
//MONGODB DATABASE OBJECTS - GET THE LIST OF ALL THE GENRES
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
  } catch (error) {
    res.status(500).send("Something failed.");
  }
});

//So when we have server error maybe due to network outage, we get the error message that 'something failed'

//BEAR IN MIND: - You need to start and stop the "mongod service" from the task manager and not from command prompt any more
