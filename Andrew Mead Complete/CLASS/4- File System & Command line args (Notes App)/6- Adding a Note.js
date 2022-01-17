/*We will wire up the add command*/

//notes.js
const fs = require("fs");
function getNotes() {
  return "Your notes...";
}
//function to add a note
const addNotes = function(title, body) {
  const notes = loadNotes();
  console.log(notes);
};

//function for loading notes
const loadNotes = function() {
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
//exporting multiple functions
module.exports = {
  getNotes: getNotes,
  addNotes: addNotes
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
  //  Our handler handles the addnote function from notes.js passing the title & body args
  handler: function(argv) {
    notes.addNotes(argv.title, argv.body);
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

/*Now if we run the program : -

node app.js add --title="t" --body="b"
[]

Here we get an empty array because we have no notes saved which we can load
*/

/*ADDING OUR NOTES*/

//notes.js
const fs = require("fs");
function getNotes() {
  return "Your notes...";
}
//function to add a note
const addNotes = function(title, body) {
  //  loading existing notes
  const notes = loadNotes();
  //adding a new note
  notes.push({
    title: title,
    body: body
  });
  //logging the notes to console
  console.log(notes);
  //  calling the saveNotes function to save the note
  saveNotes(notes);
};

//function for loading notes
const loadNotes = function() {
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
const saveNotes = function(notes) {
  //  converting the note object to JSON
  const dataJSON = JSON.stringify(notes);
  //writing/saving the converted note to "notes.json" file
  fs.writeFileSync("notes.json", dataJSON);
};
//exporting multiple functions
module.exports = {
  getNotes: getNotes,
  addNotes: addNotes
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
  //  Our handler handles the addnote function from notes.js passing the title & body args
  handler: function(argv) {
    notes.addNotes(argv.title, argv.body);
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

/*Running the app : -
node app.js add --title="t" --body="b"                                       [ { title: 't', body: 'b' } ]

Now our new note is created and in the directory we have a new file "notes.json" with the content we passed.*/

/*ADDING VALIDATION TO CHECK IF THE TITLE HAS BEEN TAKEN TO PREVENT DUPLICATE NOTES*/

//notes.js
const fs = require("fs");
function getNotes() {
  return "Your notes...";
}
//function to add a note
const addNotes = function(title, body) {
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
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

//function for loading notes
const loadNotes = function() {
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
const saveNotes = function(notes) {
  //  converting the note object to JSON
  const dataJSON = JSON.stringify(notes);
  //writing/saving the converted note to "notes.json" file
  fs.writeFileSync("notes.json", dataJSON);
};
//exporting multiple functions
module.exports = {
  getNotes: getNotes,
  addNotes: addNotes
};

/*Now if we run the app again with the same code we have used previously to add a note : -
node app.js add --title="List" --body="Sweater, Pants"                                           Note title taken!*/
