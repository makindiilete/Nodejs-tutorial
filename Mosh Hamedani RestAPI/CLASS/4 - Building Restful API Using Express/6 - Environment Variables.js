/*We need to improve the port we are using in this app, we have used hardcoded number 3000, while this may work in development env, it is unlikely its going to work in prod env because when you deploy the app, the port is dynamically assigned by the hosting environment.
 *
 * So we can fix this by using an environment variable so typically in node application, we have an env called PORT*/

const express = require("express");

//this creates an express app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

//setting our env variable for PORT
//this means if we have an env variable called "PORT", we use it, else we use 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

//SETTING AN ENV VARIABLE FOR "PORT"
/*Go to the terminal and enter the code "set PORT=5000"
 *
 * Now if we start the app in the cmd with nodemon, the port is changed to 5000*/
