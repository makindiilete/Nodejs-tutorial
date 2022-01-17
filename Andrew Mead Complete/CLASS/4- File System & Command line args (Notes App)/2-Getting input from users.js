/*We will learn how to get input from users into our app which is required to create something meaningful.
For example, to add a new note, we will need to provide some info about the new note e.g. Title & Body.
To remove a note from 15 different notes, we need to provide some info about which note we want to remove.
We will handle getting this input from users via the command line arguments and later we will learn how to get input into our note application from a client such as browser.*/

//ACCESSING THE COMMAND LINE ARGS : - These are the extra keywords provided when running the application e.g instead of running it with "node app.js", we can provide extra keyword and run it with "node app.js Michaelz" and Michaelz here will be the command line args. We can access all this provided cmd line args using the "process.argv"

//app.js
const chalk = require("chalk");
const getNotes = require("./notes");

const msg = getNotes();
console.log(msg);

const greenMsg = chalk.green.inverse.bold("Success!");
console.log(greenMsg);

//Accessing all the command line args provided
console.log(process.argv);

/*Running the app: -
node app.js Michaelz

Your notes...
Success!

[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Michaelz Omoakin\\Documents\\Web development\\Nodejs\\Andrew Mead complete
 Nodejs\\notes-app\\app.js',
  'Michaelz' ]

Here we get an array of 3 strings : - The first is the path to node, the second is the path to our app.js file and the 3rd is the value we provided which we can take advantage of in our program to do something meaningful....
The first 2 array elements are constant and are always shown by default.
 */

//Discarding the 2 default strings and printing only the value we provided

//app.js
console.log(process.argv[2]); //returns "Michaelz"

/*In the case of our notes app, we can use the first value we passed after "node app.js" to pass a command we want to execute e.g. "node app.js add" Will add a note, */

//app.js
const chalk = require("chalk");
const getNotes = require("./notes");

const command = process.argv[2];
//Checking if the cmd line arg passed is "Add" then we can execute some code like writing a code to add a note. (For now we will just log to console).
if (command === "add") {
  console.log("Adding note!");
}

/*
node app.js add

Adding note!
*/

//app.js
const chalk = require("chalk");
const getNotes = require("./notes");

const command = process.argv[2];
//Checking if the cmd line arg passed is "Add" then we can execute some code like writing a code to add a note. (For now we will just log to console).
if (command === "add") {
  console.log("Adding note!");
}
// if the cmd arg passed is "remove" we write code to remove the note
else if (command === "remove") {
  console.log("Removing note!");
}

/*Now that we know how to setup commands, we need to be able to provide more info about the note to be added or removed like the "title".

To do this we write the code : - "node app.js add --title="This is my title"*/

//app.js
const chalk = require("chalk");
const getNotes = require("./notes");
//accessing only the command passed
const command = process.argv[2];
//dumping all the cmd args in  the console so we can access our title
console.log(process.argv);
//Checking if the cmd line arg passed is "Add" then we can execute some code like writing a code to add a note. (For now we will just log to console).
if (command === "add") {
  console.log("Adding note!");
}
// if the cmd arg passed is "remove" we write code to remove the note
else if (command === "remove") {
  console.log("Removing note!");
}

/*node app.js add --title="This is my title"

[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Michaelz Omoakin\\Documents\\Web development\\Nodejs\\Andrew Mead complete
 Nodejs\\notes-app\\app.js',
  'add',
  '--title=This is my title' ]

Adding note!

Now we see our title passed but we can see here that both the key and value get passed as one single string.
In the next lesson we will explore an npm package with which we can better work with cmd args
*/
