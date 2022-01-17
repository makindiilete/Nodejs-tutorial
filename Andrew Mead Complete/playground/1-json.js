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
// const dataBuffer = fs.readFileSync("1-json.json");
// //converting our binary data to JSON
// const dataJSON = dataBuffer.toString();
// //converting our JSON data back to JS object
// const data = JSON.parse(dataJSON);
// console.log(data.title);

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
