/*We will learn how to load in another file we have created using the same "require()"
* The ability to load in our own files allows to stay organised so instead of writing all our codes inside one file, we can define a function in another file and use the require() to load it in our app.js file
*
* 1-    Add a new file inside notes app dir*/

//utils.js
console.log("utils.js");

//app.js
//loading our newly created utils.js file
const utils = require("./utils");

const name = "Michaelz"
console.log(name);

/*Running the app we get :-
utils.js
Michaelz

Both code in the two files are getting executed from app.js because we have loaded the external file*/

/*ACCESSING VARIABLES DEFINED IN EXTERNAL FILES : - Even though we have loaded our external files in app.js, we still will not be able to access the variables defined in this external file by default. Example is below*/

//utils.js
console.log("utils.js");

const name = "Omoakin"

//app.js
//loading our newly created utils.js file
const utils = require("./utils");

console.log(name);

/*Running the app we get the error : -
console.log(name);
            ^

ReferenceError: name is not defined
*/

//ACCESSING THE VARIABLES IN AN EXTERNAL FILE USING "module.exports"

//utils.js
console.log("utils.js");

const name = "Omoakin"

//exporting our variable "name"
module.exports = name

//app.js
//loading our variable exported from utils.js
const name = require("./utils");
console.log(name);

/*utils.js
Omoakin*/

//ACCESSING FUNCTIONS FROM AN EXTERNAL FILE

//utils.js
console.log("utils.js");

const name = "Omoakin"

//creating a function
const add = function(a,b) {
    return a + b
}

//exporting our function "add"
module.exports = add


//app.js
//loading our function exported from utils.js
const add = require("./utils");
const sum = add(4,2)
console.log(sum);

/*utils.js
6*/

/*CHALLENGE : - Define and use a function in a new file
* 1-    Create a new file called notes.js
* 2-    Create getNotes function that return "Your notes...."
* 3-    Export getNotes function
* 4-    From app.js, load in and call the function printing message to console*/

//notes.js
function getNotes() {
    return "Your notes..."
}

module.exports = getNotes;

//app.js
const getNotes = require("./notes")
const msg = getNotes()
console.log(msg)

/*Running the app we get : -
Your notes....*/