/*NOW WE WILL LEARN HOW TO DELETE INDIVIDUAL DOCUMENT OR BATCH DELETE TO DELETE MULTIPLE DOCUMENTS AT ONCE.

We use deleteOne() to remove a single document
We use deleteMany() to remove multiple documents

Before now we use the remove() but this has been deprecated*/

//DELETE MULTIPLE DOCUMENTS : Delete all users with the age of 29 in the users database
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
    //  DELETING ALL USERS WITH THE AGE OF 29 FROM USERS DATABASE
    db.collection("users")
      .deleteMany({
        age: 29
      })
      .then(result => {
        console.log("Users deleted!", result.deletedCount);
      })
      .catch(() => {
        console.log(error);
      });
  }
);

/*Users deleted! 3*/

/*CHALLENGE : - Use deleteOne to remove a task
 * 1-    Grab the description for the task you want to remove
 * 2-    Setup the call with the query
 * 3-    Use promise methods to setup the success/error handlers
 * 4-    Test your work*/
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
    //  DELETING A SINGLE TASK THAT MATCHED THE PASSED DESCRIPTION.
    db.collection("tasks")
      .deleteOne({
        description: "Check Your trade"
      })
      .then(result => {
        console.log("Task deleted!", result.deletedCount);
      })
      .catch(() => {
        console.log(error);
      });
  }
);

/*Task Deleted! 1*/
