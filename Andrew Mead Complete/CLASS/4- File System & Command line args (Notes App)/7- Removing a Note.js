/*WIRING UP THE REMOVE COMMAND : - We will do this in 3 steps challenge*/

/*CHALLENGE 1 : - Setup command option and function
1-  Setup the remove command to take a required "--title" option
2-  Create and export a removeNote function from notes.js
3-  Call removeNote in remove command handler
4-  Move removeNote log the title of the note to be removed
5-  Test your work using: node app.js remove --title="some title"*/

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
  //adding the command options
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  //  this handle the remove function from notes.js
  handler: function(argv) {
    notes.removeNote(argv.title);
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
    console.log("New note added");
  } else {
    console.log("Note title taken!");
  }
};

//function to remove note
const removeNote = function(title) {
  console.log(title);
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
  addNotes: addNotes,
  removeNote: removeNote
};

/*Testing th program : -
node app.js remove --title="some title"                                                          some title
*/

/*CHALLENGE 2 : - Wire up removeNote
1-  Load existing notes
2- Use array filter method to remove the matching note (if any)
3-  Save the newly created array
4-  Test your work with a title that exists and a title that doesn't exist*/

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
  //adding the command options
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  //  this handle the remove function from notes.js
  handler: function(argv) {
    notes.removeNote(argv.title);
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
    console.log("New note added");
  } else {
    console.log("Note title taken!");
  }
};

//function to remove note
const removeNote = function(title) {
  const notes = loadNotes();
  //We are using the filter method to filter notes that the title passed does not match any title in the notes database and keep those notes
  const notesToKeep = notes.filter(function(note) {
    return note.title !== title;
  });
  // const notesToKeep = notes.filter(note => note.title !== title);

  //  Saving those only those notes we want to keep and thereby removing others
  saveNotes(notesToKeep);
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
  addNotes: addNotes,
  removeNote: removeNote
};

/*Now if we run the code to remove an existing note : -
node app.js remove --title="t"

If we check the "notes.json" file, we see the notes passed has been removed*/

/*CHALLENGE 3 : - Use chalk to provide useful logs for remove
1-  If a note is removed, print "Note removed!" with a green background
2-  If no note is removed, print "No note found!" with a red background*/

//notes.js
const fs = require("fs");
const chalk = require("chalk");
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
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

//function to remove note
const removeNote = function(title) {
  const notes = loadNotes();
  //We are using the filter method to filter notes that the title passed does not match any title in the notes database and keep those notes
  const notesToKeep = notes.filter(function(note) {
    return note.title !== title;
  });
  // const notesToKeep = notes.filter(note => note.title !== title);

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
  addNotes: addNotes,
  removeNote: removeNote
};
