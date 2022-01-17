/*We will learn how to update our documents and we will be doing that with promises instead of callbacks.

Just like querying documents where we use "find()" and "findOne", for update, we use "updateOne()" & "updateMany()". We also have "update()" which has been deprecated*/

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

    //  Updating the name of a document. "users" is the collection name
    const updatePromise = db.collection("users").updateOne(
      //  we specify the id of the doc to update
      {
        _id: new ObjectID("5d709c5d5048da1d303ed6be")
      },
      {
        //  we use $set to set a new value to the "name" property
        $set: {
          name: "Oluwamayowa"
        }
      }
    );
    //we call .then & .catch promise method on the update variable
    updatePromise
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);

/*Now if we run the app and refresh our robo3t, we see the name field of the document updated.*/

//CHAINING TO UPDATE
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

    //  Updating the name of a document. "users" is the collection name
    db.collection("users")
      .updateOne(
        //  we specify the id of the doc to update
        {
          _id: new ObjectID("5d709c5d5048da1d303ed6be")
        },
        {
          //  we use $set to set a new value to the "name" property
          $set: {
            name: "Omoakin"
          }
        }
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);

/*MONGODB UPDATE OPERATORS : - Head over to google and search for "mongodb update operators. This will give us the list of all update operators we can use like the "$set" which we use to set the value of a field in a document.
1-  $currentDate
    $inc : Increment the value of the field by the specified amount
    $min : Only updates the field if the specified value is less than the existing field value
    $max : Only updates the field if the specified value is greater than the existing field value
    $mul : Multiplies the value of the field by the specified amount
    $rename : Renames a field
    $set : Sets the value of a field in a document
    $setOnInsert : Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.
    $unset : Removes the specified field from a document*/

//USING $inc OPERATOR
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

    //  Updating the name of a document. "users" is the collection name
    db.collection("users")
      .updateOne(
        //  we specify the id of the doc to update
        {
          _id: new ObjectID("5d709c5d5048da1d303ed6be")
        },
        {
          //  we use $inc to increment the value of age field by 1, -1 will decrement by 1
          $inc: {
            age: 1
          }
        }
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);

/*Now if we run the app and head back to robo3t, the age will increment from 28 to 29.*/

/*CHALLENGE : - Use updateMany to complete all tasks
 * 1-    Check the documentation for updateMany
 * 2-    Setup the call with the query and the updates
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

    //  Updating the name of a document. "users" is the collection name
    /* db.collection("users")
          .updateOne(
            //  we specify the id of the doc to update
            {
              _id: new ObjectID("5d709c5d5048da1d303ed6be")
            },
            {
              //  we use $inc to increment the value of age field by 1, -1 will decrement by 1
              $inc: {
                age: 1
              }
            }
          )
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          });*/

    // Updating many challenge : - Update all tasks to completed
    db.collection("tasks")
      .updateMany(
        { completed: false },
        {
          $set: {
            completed: true
          }
        }
      )
      .then(result => {
        //  "result.modifiedCount" returns the total number of updated documents
        console.log("All Documents Updated to true! ", result.modifiedCount);
      })
      .catch(error => {
        console.log(error);
      });
  }
);

/*Running the app : -
All Documents Update to true! 1
And checking our database, we see all documents have been updated to true.*/
