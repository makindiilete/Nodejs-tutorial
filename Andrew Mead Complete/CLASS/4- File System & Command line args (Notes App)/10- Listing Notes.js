/*We will be wiring up our list command with challenge
CHALLENGE : Wire up list command
1-  Create and export listNotes from notes.js
    "Your notes" using chalk
    Print note title for each note
2-  Call listNotes from command handler
3-  Test your work*/

//notes.js
const fs = require("fs");
const chalk = require("chalk");
function getNotes() {
  return "Your notes...";
}
//function to add a note
const addNotes = (title, body) => {
  //  loading existing notes
  const notes = loadNotes();
  //adding validation to prevent note duplicates
  const duplicateNotes = notes.filter(note => note.title === title);
  /*  const duplicateNotes = notes.filter(function(note) {
      return note.title === title;
    });*/
  //if duplicateNotes[] length is 0 that means we found not existing note title
  if (duplicateNotes.length === 0) {
    //adding a new note
    notes.push({
      title: title,
      body: body
    });
    //  calling the saveNotes function to save the note
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

//function to remove note
const removeNote = title => {
  const notes = loadNotes();
  //We are using the filter method to filter notes that the title passed does not match any title in the notes database and keep those notes
  const notesToKeep = notes.filter(note => note.title !== title);

  //if the loaded notes is greater than the new notes we want to keep, it means a note has been removed from the loaded notes
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed!"));
    //  Saving those only those notes we want to keep and thereby removing others
    saveNotes(notesToKeep);
  }
  //if the title of the note we pass to be removed doesnt exist
  else {
    console.log(chalk.red.inverse("No Note Found!"));
  }
};

//function to list note
const listNotes = () => {
  //loading all notes
  const notes = loadNotes();
  //Printing "Your notes" msg
  console.log(chalk.inverse("Your notes"));
  //Using JS forEach method to print the title of each note
  notes.forEach(note => {
    console.log(note.title);
  });
};

//function for loading notes
const loadNotes = () => {
  //  we try to run this code to read existing note but if the program fails maybe due to the fact that a note doesnt exist yet then we run the "catch" block which returns and empty array
  try {
    //  reading the note file in binary
    const dataBuffer = fs.readFileSync("notes.json");
    //converting the binary to json
    const dataJSON = dataBuffer.toString();
    //returning the conversion of json to js object
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

//function for saving notes
const saveNotes = notes => {
  //  converting the note object to JSON
  const dataJSON = JSON.stringify(notes);
  //writing/saving the converted note to "notes.json" file
  fs.writeFileSync("notes.json", dataJSON);
};
//exporting multiple functions
module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes
};

//app.js
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
  //  (ES6 method definition syntax)   this takes a function to be called if the command is ever used
  handler() {
    console.log("Reading a note");
  }
});

//correcting the args from passing twice
yargs.parse();

/*Running the code to list the notes : -
Your notes
List 2
List
 */
