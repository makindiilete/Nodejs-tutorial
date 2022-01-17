/*You will learn how to read documents from mongodb database.
* READ OPERATION
-   Read specific document by ID
-   Read multiple documents limiting them to a specific subset or filter e.g. users whose age is 27 or task that are yet to be completed

FOR FETCHING DATA FROM MONGODB DATABASE, WE CAN HEAD OVER TO THE DOCS AND SEARCH FOR "find & findOne"
FIND : - This fetch multiple documents out of the database using a filter
FINDONE : - This fetch individual document

We have other methods related to find e.g.
findAndModify : - This will find and change the document (UPDATE)
findAndRemove : - This will find and remove the document (DELETE)
We will talk about those later*/

/*USING "find()" AND SEARCHING BY ONE FIELD/PROPERTY*/
//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//defining the connectionURL for mongodb
const connectionURL = "mongodb://127.0.0.1:27017";
//defining the database name we want to create
const databaseName = "task-manager";

//Now connecting to the server (3 args : - URL, option Obj & callbackfn)
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database!");
      return;
    }
    //  on successful connection, we run this code to create a document
    const db = client.db(databaseName);
    //  specify the collection where we want to find the document
    //    then we use the "findOne" method which takes 3 args : query - this is an object with a property and a name to search for, options - Not used here, callbackfn - function to run when operation completes.
    //    In this case, we want to go into the "users" collection, search for the document having the keyvalue pair of {name: "Michaelz"}
    db.collection("users").findOne({ name: "Michaelz" }, (error, user) => {
      if (error) {
        console.log("Unable to fetch!");
      }
      console.log(user);
    });
  }
);

//Running the app, we get the result : -
//{ _id: 5d709c5d5048da1d303ed6be, name: 'Michaelz', age: 28 }

//SEARCHING BY MULTIPLE FIELDS
//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//defining the connectionURL for mongodb
const connectionURL = "mongodb://127.0.0.1:27017";
//defining the database name we want to create
const databaseName = "task-manager";

//Now connecting to the server (3 args : - URL, option Obj & callbackfn)
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database!");
      return;
    }
    //  on successful connection, we run this code to create a document
    const db = client.db(databaseName);
    //USING findOne()
    db.collection("users").findOne(
      { name: "Michaelz", age: 1 },
      (error, user) => {
        if (error) {
          console.log("Unable to fetch!");
        }
        console.log(user);
      }
    );
  }
);

/*Because there is no name with Michaelz and having the age of "1", we dont get an error but we get "null"

findOne() will always return a single result, so if we have muliple matching results, only the first match will be returned.*/

//SEARCHING BY ID THE STANDARD WAY
//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//defining the connectionURL for mongodb
const connectionURL = "mongodb://127.0.0.1:27017";
//defining the database name we want to create
const databaseName = "task-manager";

//Now connecting to the server (3 args : - URL, option Obj & callbackfn)
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database!");
      return;
    }
    //  on successful connection, we run this code to create a document
    const db = client.db(databaseName);
    //Searching by ObjectID
    db.collection("users").findOne(
      { _id: new ObjectID("5d709c5d5048da1d303ed6be") },
      (error, user) => {
        if (error) {
          console.log("Unable to fetch!");
        }
        console.log(user);
      }
    );
  }
);

/*{ _id: 5d709c5d5048da1d303ed6be, name: 'Michaelz', age: 28 }*/

//SEARCHING FOR MULTIPLE DOCUMENTS
/*We search for multiple documents using the "find()" method and this does not take a callback arg and does not return the documents we searched for but returns a "cursor" and this cursor allows us to perform alot of different operations on the returned cursor, one of those operations is to convert the returned cursor to an array which will mean we will have an array of all the matching searched documents.

USING THE "toArray()" on "find()"*/

//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//defining the connectionURL for mongodb
const connectionURL = "mongodb://127.0.0.1:27017";
//defining the database name we want to create
const databaseName = "task-manager";

//Now connecting to the server (3 args : - URL, option Obj & callbackfn)
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database!");
      return;
    }
    //  on successful connection, we run this code to create a document
    const db = client.db(databaseName);
    //  Searching for multiple documents
    //  Search the "tasks" collection and return all documents
    db.collection("tasks")
      .find({ completed: true })
      .toArray((error, users) => {
        console.log(users);
      });
  }
);

/*
[ { _id: 5d70acd9ee65ea1810e56b58,
    description: 'Check Currency Strength',
    completed: true },
  { _id: 5d70acdaee65ea1810e56b59,
    description: 'Check for Ichimoku London open breakout',
    completed: true } ]
    */

//GETTING THE COUNT OF MATCHING DOCUMENTS
//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//defining the connectionURL for mongodb
const connectionURL = "mongodb://127.0.0.1:27017";
//defining the database name we want to create
const databaseName = "task-manager";

//Now connecting to the server (3 args : - URL, option Obj & callbackfn)
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database!");
      return;
    }
    //  on successful connection, we run this code to create a document
    const db = client.db(databaseName);
    //  Search the "tasks" collection and return all matching the total count of matching documents
    db.collection("tasks")
      .find({ completed: true })
      .count((error, count) => {
        console.log(count);
      });
  }
);

/*2*/

/*CHALLENGE : - Use find and findOne with tasks
 * 1-    Use findOne to fetch the last task by its id (print doc to console)
 * 2-    Use find to fetch all tasks that are not completed (print docs to console)
 * 3-    Test your work.*/

//MY SOLUTION
//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//defining the connectionURL for mongodb
const connectionURL = "mongodb://127.0.0.1:27017";
//defining the database name we want to create
const databaseName = "task-manager";

//Now connecting to the server (3 args : - URL, option Obj & callbackfn)
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database!");
      return;
    }
    //  on successful connection, we run this code to create a document
    const db = client.db(databaseName);
    //Searching for the last task by ObjectID
    db.collection("tasks").findOne(
      { _id: new ObjectID("5d70acdaee65ea1810e56b5a") },
      (error, task) => {
        if (error) {
          console.log("Unable to fetch!");
        }
        console.log(task);
      }
    );
    //  Searching for multiple documents
    //  Search the "tasks" collection and return all not completed task
    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, task) => {
        console.log(task);
      });
  }
);

/*[ { _id: 5d70acdaee65ea1810e56b5a,
    description: 'Check Your trade',
    completed: false } ]
{ _id: 5d70acdaee65ea1810e56b5a,
  description: 'Check Your trade',
  completed: false }*/
