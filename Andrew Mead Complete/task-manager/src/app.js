//EXTERNAL ROUTES
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

//loading our mongoose.js file where we connect to database
require("./db/mongoose");
// require("./db/mongoose");

/*Creating our server*/
const express = require("express");
const app = express();
  const cors = require("cors");

//Allowing options request on all resources
app.options("*", cors());
app.use(cors());
app.use(express.json()); //passing json to obj automatically
app.use(userRouter); //registering our userRouter
app.use(taskRouter); //registering our taskRouter

//
//Without middleware: new request -> run route handler
//
//With middleware: new request -> do something -> run route handler
//

//2-  We define our port
// const port = process.env.PORT;
const port = process.env.PORT || 5000;

//3-  Then we call on listen
app.listen(port, () => {
  console.log("Server is up and running on " + port);
});

module.exports = app;
// export default app;
