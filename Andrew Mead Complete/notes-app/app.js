const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

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
  //  (ES6 method definition syntax) Our handler handles the addnote function from notes.js passing the title & body args
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  }
});

//Create remove command
yargs.command({
  //  the command we want to pass in the cmd
  command: "remove",
  //  description of this command in the --help
  describe: "Remove a note",
  //adding the command options
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  //   (ES6 method definition syntax)  this handle the remove function from notes.js
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

//Create list command
yargs.command({
  //  the command we want to pass in the cmd
  command: "list",
  //  description of this command in the --help
  describe: "List your notes",
  //  (ES6 method definition syntax)   this takes a function to be called if the command is ever used
  handler() {
    notes.listNotes();
  }
});

//Create read command
yargs.command({
  //  the command we want to pass in the cmd
  command: "read",
  //  description of this command in the --help
  describe: "Read a note",
  //Setting up our options
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  //  (ES6 method definition syntax)   this takes a function to be called if the command is ever used
  handler(argv) {
    notes.readNote(argv.title);
  }
});

//correcting the args from passing twice
yargs.parse();
