/*Here we will learn how w can setup more options for yargs command e.g. The add command needs the title and body of the note we are adding, the remove command needs the title of the note we are trying to remove, read command needs the title of the note we want to read.*/

//app.js
const chalk = require("chalk");
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
  //  here we list all options we want the command to support
  builder: {
    //  title is takes an object with the title description
    title: {
      describe: "Note title"
    }
  },
  //  our function takes the "argv" parameter that dumps all the cmd line arg to the console
  handler: function(argv) {
    console.log("Adding a new note", argv);
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

/*
node app.js add --title="Shopping list"                                      Adding a new note { _: [ 'add' ], title: 'Shopping list', '$0': 'app.js' }
{ _: [ 'add' ], title: 'Shopping list', '$0': 'app.js' }
*/

/*MAKING THE ARGS OPTIONS REQUIRED : - With this, we need to provide the option property (--title) for the command to work correctly*/

//app.js
const chalk = require("chalk");
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
  //  here we list all options we want the command to support
  builder: {
    //  title is takes an object with the title description
    title: {
      describe: "Note title",
      //  this makes the title option required
      demandOption: true
    }
  },
  //  our function takes the "argv" parameter that dumps all the cmd line arg to the console
  handler: function(argv) {
    console.log("Adding a new note", argv);
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

/*node app.js add
app.js add

Add a new note

Options:
  --help     Show help                                   [boolean]
  --version  Show version number                         [boolean]
  --title    Note title                                 [required]

Missing required argument: title

Here we can see that it is saying we are missing the title and under options we can see the format how we can enter it.*/

//ENFORCING THE OPTIONS VALUE TYPE

//app.js
const chalk = require("chalk");
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
  //  here we list all options we want the command to support
  builder: {
    //  title is takes an object with the title description
    title: {
      describe: "Note title",
      //  this makes the title option required
      demandOption: true,
      //  this enforce we can only pass a string value (by default it will be boolean)
      type: "string"
    }
  },
  //  our function takes the "argv" parameter that dumps all the cmd line arg to the console
  handler: function(argv) {
    console.log("Adding a new note", argv);
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

/*node app.js add --title
Adding a new note { _: [ 'add' ], title: '', '$0': 'app.js' }
{ _: [ 'add' ], title: '', '$0': 'app.js' }

node app.js add --title="My Title"                                         Adding a new note { _: [ 'add' ], title: 'My Title', '$0': 'app.js' }
{ _: [ 'add' ], title: 'My Title', '$0': 'app.js' }*/

/*So far we notice our args are getting printed twice and that is because we are printing it inside the handler and also last line of our code with "//dumping cmd args with yargs
console.log(yargs.argv);"

We can correct this and use "yargs.parse()"*/

//app.js
const chalk = require("chalk");
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
  //  here we list all options we want the command to support
  builder: {
    //  title is takes an object with the title description
    title: {
      describe: "Note title",
      //  this makes the title option required
      demandOption: true,
      //  this enforce we can only pass a string value (by default it will be boolean)
      type: "string"
    }
  },
  //  our function takes the "argv" parameter that dumps all the cmd line arg to the console
  handler: function(argv) {
    console.log("Adding a new note", argv);
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

//correcting the args from passing twice
yargs.parse();

/*node app.js add --title="My Title"                                         Adding a new note { _: [ 'add' ], title: 'My Title', '$0': 'app.js' }*/

/*PRINTING THE TITLE EXPLICITLY*/

//app.js
const chalk = require("chalk");
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
  //  here we list all options we want the command to support
  builder: {
    //  title is takes an object with the title description
    title: {
      describe: "Note title",
      //  this makes the title option required
      demandOption: true,
      //  this enforce we can only pass a string value (by default it will be boolean)
      type: "string"
    }
  },
  //  our function takes the "argv" parameter that dumps all the cmd line arg to the console
  handler: function(argv) {
    //  printing the title
    console.log("Title: ", argv.title);
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

//correcting the args from passing twice
yargs.parse();

/*node app.js add --title="My Title"                                         Title:  My Title*/

/*CHALLENGE : - Add an option to yargs
1-  Setup a body option for the add command
2-  Configure a description, make it required, and for it to be a string
3-  Log the body value in the handler function
4-  Test your work*/

//app.js
const chalk = require("chalk");
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
  //  here we list all options we want the command to support
  builder: {
    //  title is takes an object with the title description
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  //  our function takes the "argv" parameter that dumps all the cmd line arg to the console
  handler: function(argv) {
    //  printing the title
    console.log("Title: ", argv.title);
    //  printing the body
    console.log("Body: ", argv.body);
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

//correcting the args from passing twice
yargs.parse();

/*node app.js add --title="My title" --body="My Body"                        Title:  My title
Body:  My Body*/
