/*
In this lesson, we will be kicking up by setting up a new project folder for the chat app and we will take our first step of getting some codes inside of there setting up a basic server using express which we will be building up of throughout ds projects.
1-  In the course root dir, create a new folder "chat-app"
2-  In the chat-app dir, create a new dir "src" and inside the src, create a new file  "index.js" */

/*CHALLENGE : - Create an express web server that serves up an html
 * 1-  Initialize npm and install Express
 * 2-  Setup a new Express server
 *       Serve up the public directory
 *       Listen on port 3000
 * 3-  Create index.html and render "Chat App" to the screen
 * 4-  Test your work! Start the server and view the page in the browser.*/

//loading express
const express = require("express");
//loading the path module for our public dir
const path = require("path");
//creating d app
const app = express();

//setting our port
const port = process.env.PORT;

//serving up our public dir
const publicDirectoryPath = path.join(__dirname, "../public");

//using d created public dir
app.use(express.static(publicDirectoryPath));

//Starting up the server.
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

/*CHALLENGE : - Setup Scripts in package.json
 * 1-  Create a start "script" to start the app using node
 * 2-  Install nodemon and as development dependency
 * 3-  Create a "dev" script to start the app using nodemon
 * 4-  Run both scripts to test your work*/

/*"scripts": {
  "start": "node src/index.js",
    "dev": "env-cmd ./config/dev.env nodemon src/index.js"
},*/
