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
  //debugging with node debugger
  debugger;

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
