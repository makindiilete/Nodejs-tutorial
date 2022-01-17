/*We will talk about errors in nodejs and check how we can use the information errors provide us to figure out what is wrong in our program.

We will be intentionally breaking our app to figure out the error it generates and how we can use it to figure out what is happening*/

//changing dataJSON to dataJsON
//function for saving notes
const saveNotes = notes => {
  //  converting the note object to JSON
  const dataJSON = JSON.stringify(notes);
  //writing/saving the converted note to "notes.json" file
  fs.writeFileSync("notes.json", dataJsON);
};

/*Running the program we get the error : -
node app.js add --title="Error message" --body="run it"

C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\node_modules\yargs\yargs.js:1144
      else throw err
           ^

ReferenceError: dataJsON is not defined
    at saveNotes (C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\notes-app\notes.js:101:34)
    at Object.addNotes (C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\notes-app\notes.js:22:5)
    at Object.handler (C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\notes-app\app.js:32:11)
    at Object.runCommand (C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\node_modules\yargs\lib\command.js:238:44)
    at Object.parseArgs [as _parseArgs] (C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\node_modules\yargs\yargs.js:1059:30)
    at Object.parse (C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\node_modules\yargs\yargs.js:538:19)
    at Object.<anonymous> (C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\notes-app\app.js:89:7)
    at Module._compile (internal/modules/cjs/loader.js:688:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)
    at Module.load (internal/modules/cjs/loader.js:598:32)


The most important part of these error info is : -

ReferenceError: dataJsON is not defined

And below these message contains a stack trace of all the functions that are calling this saveNotes()*/
