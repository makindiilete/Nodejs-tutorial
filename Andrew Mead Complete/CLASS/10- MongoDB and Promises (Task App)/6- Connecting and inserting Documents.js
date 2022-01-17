/*In this video we will connect to our mongodb database from a nodejs app and you will learn how to insert new documents into the database collection.

To get this done, we will be using "mongodb driver" which is an npm module we are going to install and it will allow us to interact with our database from node.

TO learn about this driver : -
1-  Visit their docs homepage https://docs.mongodb.com
2-  Click on the "MongoDB Drivers" in the sidebar : - This are the libraries that allows you interact with mongodb database from a wide range of programming languages
3-  Select Nodejs
4-  It will take you to the page showing the latest releases, Reference (to learn more) and API (which contains every single properties & functions available for the driver).
5-  So click on the API.
6-  So install the mongodb module "npm mongodb"
7-  In the task-manager dir, create a new file "mongodb.js"

We will learn how to perform our CRUD operations with the database.*/

//CONNECTING FROM NODEJS TO MONGODB DATABASE
//mongodb.js
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
  //callbackfn to run when we connect to mongodb which returns either an error or a client
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database!");
      return;
    }
    console.log("Connected correctly!");
  }
);

/*Now if we run the app, we should get the message "Connected Correctly!"*/

//INSERTING OUR FIRST DOCUMENTS

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
    //   creating a collection where our documents will be created
    //    this takes an argument (the collection name) and then a method to insert the document which will be all the fields we want the document to contain
    db.collection("users").insertOne({
      name: "Michaelz",
      age: 28
    });
  }
);

/*Now we re-run the app and go back to robo3t
 * Right click on the database name and click on refresh, Now our new collection should appear.
 * Click on the collection name "task-manager"
 * Click on "Collections" > Click on the collection name "users"
 * Double click to view the documents or right click and select "View Document
 * Now we get our document showing 3 fields : _id, name & age. We didnt create "_id" but this was automatically generated for us as a unique identifier for that document.
 * From the robo3t interface, you can change from the default view to "Tree view, Table view or JSON view*/
