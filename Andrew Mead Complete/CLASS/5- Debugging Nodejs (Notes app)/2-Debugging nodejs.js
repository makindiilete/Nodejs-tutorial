/*We will talk about how to best debug our nodejs app using some debugging tips and tools.
We will always run into two types of errors : -
1) We will have things go run and get explicit error messages. This we have seen already when we made typo errors.
2) When things go wrong and there is no error messages. This might likely means we have some sought og logic problems in our code that we need to first figure out where it is then adjust to make it works.

DEBUGGING TOOLS : -
1) Console.log

For example in our addNote function inside "notes.js", if we are not getting the "Note title taken" message printing when we try to add a duplicate note, we can first check what the variable "duplicateNote" is returning to confirm if it is what we are expecting*/

//function to add a note
const addNotes = (title, body) => {
  //  loading existing notes
  const notes = loadNotes();
  //Here we are using the find method to search for the first duplicate and stop searching
  const duplicateNote = notes.find(note => note.title === title);
  //debugging duplicateNote variable with console.log
  console.log(duplicateNote);

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

/*Running the app now and trying to add a new note : -
node app.js add --title="Courses" --body="Node.js"                          undefined
New note added

//Here "duplicateNote" variable returns undefined because the note we added is not a duplicate so it could not return a note with the same title.*/

/*If we try to add another note with the same title : -
 node app.js add --title="Courses" --body="Node.js"                                               { title: 'Courses', body: 'Node.js' }
Note title taken!

Here we see that our "duplicateNote" variable returns a matching duplicate, and we successfully debug the variable with console.log to see if it returns what we want*/

/*If the variable "duplicateNote" debug does solve the problem then possibly maybe the variable "notes" is bad or the argument "title"*/

//function to add a note
const addNotes = (title, body) => {
  //  loading existing notes
  const notes = loadNotes();
  //Here we are using the find method to search for the first duplicate and stop searching
  const duplicateNote = notes.find(note => note.title === title);
  //debugging duplicateNote variable with console.log
  console.log(duplicateNote);
  console.log(title);

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

/*console.log is the most basic tool available to use to debug our apps but if we find ourselves debugging with 5 or more lines of console.log then we need to switch to something better*/

/*2ND TOOL : NODE DEBUGGER
This is the node built in debugging tool that ships in with node V8 engine and like console.log, it needs to be place at a specific line in your application.

So we can place it in the same line we placed our console.log statement under the "duplicateNote" variable and then in the debugger console we can access the value of all the variables.*/

//notes.js
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

/*
1-    And now we go back to the terminal and we can add "inspect" to the normal add command : - "node --inspect-brk app.js add --title="Courses" --body="Nodejs"
2-  Now head over to chrome and visit "chrome://inspect"
3-  Under "Target", you should see "app.js" and under it you should see "inspect" so click on "inspect"
4-  Click on the "sources" tab
5-  On the left hand side of the "sources" tab, click on "Add folder to workspace" and select your app folder.
6- Click on the "app.js"
7- Click on "Esc" key to show the console so you can check variable values
8-  Click on the blue button on the right hand panel of the sources tab to resume script execution.
Now the script will run and pause at the line where the "debugger" statement is placed
9-  Then on the console we can access the value of all the variables like the : - body, title, notes, duplicateNote
10- Now to run the program pass the paused debugger line, we simply click on the blue icon "resume script execution" again.
*/
