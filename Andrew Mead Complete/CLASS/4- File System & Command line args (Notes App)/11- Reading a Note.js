/*We will wrap up the note app by wiring up the read command.
Before we wire up the Read command, we can actually refactor our add command command because currently if we have 1000 notes, and we want to check if there is a duplicate note before adding a new note, it will search through all the 1000 notes even if a duplicate has been found at number 5. We can actually refactor our code so once a duplicate is found, we stop the search.*/

//add command refactored
//function to add a note
const addNotes = (title, body) => {
  //  loading existing notes
  const notes = loadNotes();
  //Here we are using the find method to search for the first duplicate and stop searching
  const duplicateNote = notes.find(note => note.title === title);

  //if we do not find a duplicate note then we add a new note
  if (!duplicateNote) {
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

/*CHALLENGE : - Wire up read command
1-  Setup --title option for read command
2-  Create readNote in notes.js
    Search for note by title
    Find note and print title (styled) and body (plain)
    No note found? Print error in red.
3-  Move the command handler call the function
4-  Test your work by running a couple commands.*/

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

//notes.js
const fs = require("fs");
const chalk = require("chalk");

/////////////////////////CRUD OPERATIONS///////////////////////////////
/////////////////////////CRUD OPERATIONS///////////////////////////////
//function to add a note
const addNotes = (title, body) => {
  //  loading existing notes
  const notes = loadNotes();
  //Here we are using the find method to search for the first duplicate and stop searching
  const duplicateNote = notes.find(note => note.title === title);

  //if we do not find a duplicate note then we add a new note
  if (!duplicateNote) {
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

//function to read note
const readNote = title => {
  //Loading all the notes so we can find the one to be read
  const notes = loadNotes();
  //we use the find method to find the note that match the title we passed so we can read it
  const note = notes.find(note => note.title === title);

  //if we find a matching note with the title passed in the cmd arg
  if (note) {
    //we print its title
    console.log(chalk.inverse(note.title));
    //we print its body
    console.log(note.body);
  }
  //if we find no matching note
  else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};
/////////////////////////CRUD OPERATIONS///////////////////////////////
/////////////////////////CRUD OPERATIONS///////////////////////////////

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
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};

/*Running the app : -
Passing a title to read matching note : -

node app.js read --title="List"                                             List
Nodejs List

Passing a title that doesnt exist in the notes file
node app.js read --title="List 3"                                            Note not found!*/
