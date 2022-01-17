/*In the last lesson, we have seen that node doesnt give us the ability to pass our cmd args in a way that they will be useful by separating the key and values, instead they get passed as one string unless we are able to write plenty code to separate them.

We will be using an npm yargs package.*/

//app.js
const chalk = require("chalk");
//loading yargs
const yargs = require("yargs");
const getNotes = require("./notes");

//dumping cmd args with node
console.log(process.argv);
//dumping cmd args with yargs
console.log(yargs.argv);

/*
//Node
[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Michaelz Omoakin\\Documents\\Web development\\Nodejs\\Andrew Mead complete
 Nodejs\\notes-app\\app.js' ]

// Yargs
{ _: [], '$0': 'app.js' }

The first element is the command (empty in this case), the second is our app.js file
*/

/*Comparing yargs and node with cmd args with title:-

node app.js add --title="Things to buy"

//node
[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Michaelz Omoakin\\Documents\\Web development\\Nodejs\\Andrew Mead complete
 Nodejs\\notes-app\\app.js',
  'add',
  '--title=Things to buy' ]

//  yargs
{ _: [ 'add' ], title: 'Things to buy', '$0': 'app.js' }

Here we see that what yargs provides is more useful : - We have the command, title and app.js file
*/

/*Accessing app options with yargs
node app.js --help
Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
 */

/*Getting the app version number
node app.js --version
1.0.0
*/

/*Customizing the app version number*/

//app.js
const chalk = require("chalk");
//loading yargs
const yargs = require("yargs");
const getNotes = require("./notes");

//customizing yargs version number
yargs.version("1.1.0");

//dumping cmd args with yargs
console.log(yargs.argv);

/*Running the code ; -
node app.js --version
1.1.0
*/

//Using yargs to setup commands

//app.js
const chalk = require("chalk");
//loading yargs
const yargs = require("yargs");
const getNotes = require("./notes");

//customizing yargs version number
yargs.version("1.1.0");

//add, remove, read, list

//Create add command
yargs.command({
  //  the command we want to pass in the cmd
  command: "add",
  //  description of this command in the --help
  describe: "Add a new note",
  //  this takes a function to be called if the command is ever used
  handler: function() {
    console.log("Adding a new note");
  }
});

//dumping cmd args with yargs
console.log(yargs.argv);

/*Now if we run the app with : -
node app.js --help
app.js [command]

Commands:
  app.js add  Add a new note

Options:
  --help     Show help                                   [boolean]
  --version  Show version number                         [boolean]

As you can see, we now have a new command section with the available commands we can use.*/

/*
//Using the add command

node app.js add
Adding a new note
{ _: [ 'add' ], '$0': 'app.js' }*/

//app.js
const chalk = require("chalk");
//loading yargs
const yargs = require("yargs");
const getNotes = require("./notes");

//customizing yargs version number
yargs.version("1.1.0");

//add, remove, read, list

//Create add command
yargs.command({
  //  the command we want to pass in the cmd
  command: "add",
  //  description of this command in the --help
  describe: "Add a new note",
  //  this takes a function to be called if the command is ever used
  handler: function() {
    console.log("Adding a new note");
  }
});

//Create remove command
yargs.command({
  //  the command we want to pass in the cmd
  command: "remove",
  //  description of this command in the --help
  describe: "Remove a note",
  //  this takes a function to be called if the command is ever used
  handler: function() {
    console.log("Removing the note");
  }
});

//dumping cmd args with yargs
console.log(yargs.argv);

/*node app.js --help             app.js [command]

Commands:
  app.js add     Add a new note
  app.js remove  Remove a note

Options:
  --help     Show help                                   [boolean]
  --version  Show version number                         [boolean]*/

/*node app.js remove
Removing the note
{ _: [ 'remove' ], '$0': 'app.js' }*/

/*CHALLENGE : - Add two new commands
1-  Setup command to support "List" command (print placeholder message for now)
2-  Setup command to support "read" command (print placeholder message for now)
3-  Test your work by running both commands and ensure correct output
*/

//app.js
const chalk = require("chalk");
//loading yargs
const yargs = require("yargs");
const getNotes = require("./notes");

//customizing yargs version number
yargs.version("1.1.0");

//add, remove, read, list

//Create add command
yargs.command({
  //  the command we want to pass in the cmd
  command: "add",
  //  description of this command in the --help
  describe: "Add a new note",
  //  this takes a function to be called if the command is ever used
  handler: function() {
    console.log("Adding a new note");
  }
});

//Create remove command
yargs.command({
  //  the command we want to pass in the cmd
  command: "remove",
  //  description of this command in the --help
  describe: "Remove a note",
  //  this takes a function to be called if the command is ever used
  handler: function() {
    console.log("Removing the note");
  }
});

//Create list command
yargs.command({
  //  the command we want to pass in the cmd
  command: "list",
  //  description of this command in the --help
  describe: "List your notes",
  //  this takes a function to be called if the command is ever used
  handler: function() {
    console.log("Listing out all notes");
  }
});

//Create read command
yargs.command({
  //  the command we want to pass in the cmd
  command: "read",
  //  description of this command in the --help
  describe: "Read a note",
  //  this takes a function to be called if the command is ever used
  handler: function() {
    console.log("Reading a note");
  }
});

//dumping cmd args with yargs
console.log(yargs.argv);

/*node app.js list
Listing out all notes
{ _: [ 'list' ], '$0': 'app.js' }

node app.js read
Reading a note
{ _: [ 'read' ], '$0': 'app.js' }*/
