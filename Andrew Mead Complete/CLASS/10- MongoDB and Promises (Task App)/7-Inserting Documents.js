/*We will learn how to insert documents into mongodb. We already used "insertOne" and we will check that in more details and we will see how to insert multiple documents.

Currently we do not have a callbackfn to run to check if our document get inserted successfully or fails so we can handle the error*/

//CRUD Operations : CREATE

//Insert single document
//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;

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
    //    here we create a variable that takes the name of the database we already created and use it as our document name
    const db = client.db(databaseName);
    //   creating a collection where our documents will be created
    //    this takes an argument (the collection name) and then a method to insert the document which will be all the fields we want the document to contain
    db.collection("users").insertOne(
      {
        name: "Michaelz",
        age: 28
      },
      //callbackfn to run with insertOne which takes 2 args (error: if insertion fails & result if successful
      (error, result) => {
        //if insertion fails
        if (error) {
          console.log("Unable to insert user");
          return;
        }
        //if the insertion completes, "result.ops" print an array of docs we inserted
        console.log(result.ops);
      }
    );
  }
);

/*Running the app again, we get feedback from the callbackfn : -
[ { name: 'Michaelz', age: 28, _id: 5d709f7798fd1c261047e187 } ]

NOW JUST INCASE WE ARE SURPRISE HOW WE GOT TO KNOW THAT THE "result" ARGUMENT CONTAIN A METHOD "ops".
Since we are using the "insertOne" method, we can search for this method in the nodejs driver API page, and under the "callback" Name, click on the link to take you to the available properties available. On that page we can see that indeed "result" takes a callback function containing 2 args "error & result" and for result arg, we have up to 5 available properties we can use : -
1-  insertedCount : The total amount of documents inserted
2-  ops : All the documents inserted using any of the insert methods
3-  insertedIds : Map of the index of the inserted documents to the id of the inserted document
4-  connection : - The connection object used for the operation
5-  result : The raw command result object returned from MongoDB.
Only the first two properties are important and you will use often*/

/*INSERTING MULTIPLE DOCUMENTS*/
//CRUD Operations

//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;

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
    //    here we create a variable that takes the name of the database we already created and use it as our document name
    const db = client.db(databaseName);
    //  Inserting multiple documents
    db.collection("users").insertMany(
      [
        {
          name: "Feranmi",
          age: 24
        },
        {
          name: "Abimbola",
          age: 31
        }
      ],
      (error, result) => {
        if (error) {
          console.log("Unable to insert documents!");
          return;
        }
        console.log(
          `${result.ops}. Total number of documents added is ${result.insertedCount}`
        );
      }
    );
  }
);

/*Now if we run the application, we get two document objects added and the total number*/

/*CHALLENGE : - Insert 3 task into a new tasks connection
1-  Use InsertMany to insert the documents
        Description (string), completed (boolean)
2-  Setup the callback to handle error or print ops
3-  Run the script
4-  Refresh the database in Robo Jt and view data in tasks collection*/

//MY SOLUTION
//CRUD Operations

//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;

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
    //    here we create a variable that takes the name of the database we already created and use it as our document name
    const db = client.db(databaseName);

    //  Inserting 3 tasks in a new task collection
    db.collection("tasks").insertMany(
      [
        {
          description: "Check Currency Strength",
          completed: true
        },
        {
          description: "Check for Ichimoku London open breakout",
          completed: true
        },
        {
          description: "Check Your trade",
          completed: false
        }
      ],
      (error, result) => {
        if (error) {
          console.log("Fails to create new documents!");
          return;
        }
        console.log(result.ops);
      }
    );
  }
);

/*When you run the app, we get the result : -
[ { description: 'Check Currency Strength',
    completed: true,
    _id: 5d70acd9ee65ea1810e56b58 },
  { description: 'Check for Ichimoku London open breakout',
    completed: true,
    _id: 5d70acdaee65ea1810e56b59 },
  { description: 'Check Your trade',
    completed: false,
    _id: 5d70acdaee65ea1810e56b5a } ]

And in robo3t, we get our multiple documents inserted*/
