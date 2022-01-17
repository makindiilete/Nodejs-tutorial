/*We will be figuring out how we can store our data (notes) in JSON so we can later load them, read, edit and remove.
Just like we have seen JSON in package.json, we will be doing the same to store our data. We will have an array of objects where each object represent a note and each object will have various properties like title and body and we will be able to read/write, saving/loading our data.
JSON is something we will be dealing with a lot in nodejs, JSON is just an array of objects of various properties.

We will start by learning about json by creating a "playground" directory*/

//1-json.js
//data stored as a JS object
const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday"
};

//JS object conversion into JSON
const bookJSON = JSON.stringify(book);
console.log(bookJSON);

/*Running the code : -
{"title":"Ego is the Enemy","author":"Ryan Holiday"}

Our JS book object is now converted to JSON*/

//data stored as a JS object
const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday"
};

//JS object conversion into JSON
const bookJSON = JSON.stringify(book);
console.log(bookJSON);
//we get undefined bcos this is a JSON and so we cannot access properties
console.log(bookJSON.author);

//JSON conversion back to JS object
const parsedData = JSON.parse(bookJSON);
//JSon converted back to object so we can access the author property
console.log(parsedData.author);

/*{"title":"Ego is the Enemy","author":"Ryan Holiday"}
undefined
Ryan Holiday*/

//USING JSON WITH THE FILE SYSTEM
const fs = require("fs");
//data stored as a JS object
const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday"
};

//JS object conversion into JSON
const bookJSON = JSON.stringify(book);
//Writing our converted JSON data to a file
fs.writeFileSync("1-json.json", bookJSON);

/*Running the code, we now have a new file created in our playground directory with the name "1-json.json" and the content = { "title": "Ego is the Enemy", "author": "Ryan Holiday" }
 */

//READING JSON FILE

const fs = require("fs");
//Reading the json file. (Buffer becos what we get in return by default is a binary data)
const dataBuffer = fs.readFileSync("1-json.json");
console.log(dataBuffer);

/*Running the code we get : -
<Buffer 7b 20 22 74 69 74 6c 65 22 3a 20 22 45 67 6f 20 69 73 20 74 68 65 20 45 6e 65 6d 79 22 2c 20 22 61 75 74 68 6f 72 22 3a 20 22 52 79 61 6e 20 48 6f 6c ... >
*/

//GETTING BACK THE REAL CONTENT OF OUR JSON FILE INSTEAD OF BINARY BUFFER
const fs = require("fs");
//data stored as a JS object
/*const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday"
};

//JS object conversion into JSON
const bookJSON = JSON.stringify(book);
//Writing our converted JSON data to a file
fs.writeFileSync("1-json.json", bookJSON);*/

//Reading the json file. (Buffer becos what we get in return by default is a binary data)
const dataBuffer = fs.readFileSync("1-json.json");
//using "toString()" to convert the returned binary to real content
console.log(dataBuffer.toString());

/*Running the code : -
{ "title": "Ego is the Enemy", "author": "Ryan Holiday" }*/

//1-json.js
const fs = require("fs");
//Reading the json file. (Buffer becos what we get in return by default is a binary data)
const dataBuffer = fs.readFileSync("1-json.json");
//converting our binary data to JSON
const dataJSON = dataBuffer.toString();
//converting our JSON data back to JS object
const data = JSON.parse(dataJSON);
console.log(data.title);

/*Running the code : -
Ego is the Enemy*/

/*CHALLENGE : - Work with JSON and the file system
Already in the "1-json.json" file, we have the content : -
{ "name": "Andrew", "planet": "Earth", "age": 22 }
1-  Load and parse the JSON data
2-  Change the name and age property using your info
3-  Stringify the changed object and overwrite the original data
4-  Test your work by viewing data in the JSON file
*/

//Solution
const fs = require("fs");
//Reading the JSON file
const dataBuffer = fs.readFileSync("1-json.json");
//converting the binary buffer to JSON
const dataJSON = dataBuffer.toString();
//converting the JSON to JS object
const user = JSON.parse(dataJSON);

//changing the object properties
user.name = "Michaelz";
user.age = 28;

//converting the object to JSON
const userJSON = JSON.stringify(user);
fs.writeFileSync("1-json.json", userJSON);

/*Now if we save and re-run the app and check the file "1-json.json" again, the content has been changed to : - { "name": "Michaelz", "planet": "Earth", "age": 28 }
 */
