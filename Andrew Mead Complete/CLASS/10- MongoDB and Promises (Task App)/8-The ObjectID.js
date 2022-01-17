/*We already talked about the "_id" field which mongoDb auto add to all our documents which contains binary string.
In this lesson we want to talk about the value inside.
WHAT OBJECT IDs ARE?
WHY THEY ARE USE?
HOW THEY PLAY AN IMPORTANT ROLE IN MONGODB

In an SQL database, an auto generated auto incremented integer is used : 1,2,3,4 etc.
//ADVANTAGES OF MONGODB
1-  In MongoDB, the id are known as GUID : Global Unique Identifiers and this are different because they are designed to be unique using an algorithm without needing the server to determine what the next id value is which makes MongoDB scale well to handle heavy traffic.
2-  In MongoDB, each documents carries unique id and can never be equal to another document from another database or collection unlike SQL, it is possible to have a row in a table with the id of 1 and another row in a different table having the same id of 1 which can cause conflict.
3-  We can actually generate the ids for our documents before we insert them into the database. So our server doesnt need to be the one to always generate the ID, we can always use the npm mongodb driver to generate our own.*/

//MANUALLY GENERATING OBJECT ID
//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//A function to generate a new id for us
const id = new ObjectID();
console.log(id);

/*Running the app, we get an id : -
5d70b535e9d42b1e7cdf590f*/

/*THE OBJECT ID VALUE : - We will talk about what make up the id
ObjectId of mongoDB is a 12-byte value which consists of : -
-   a 4-byte value representing the seconds since January 1970
-   a 5-byte random value
-   a 3-byte counter, starting with a random value.

OBJECT ID METHODS
getTimeStamp() : - Returns the generation date (accurate up to the second) that this ID was generated*/

//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//A function to generate a new id for us
const id = new ObjectID();
console.log(id);
//Getting the Date and time the Object ID was created
console.log(id.getTimestamp());

/*Running the app : -
5d70b773088af10cc4e45e16
2019-09-05T07:21:23.000Z
*/

/*USING OUR MANUALLY GENERATED OBJECT ID AS THE ID OF A NEW DOCUMENT WE INSERT*/

//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//A function to generate a new id for us
const id = new ObjectID();
console.log(id);
//Getting the Date and time the Object ID was created
console.log(id.getTimestamp());

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
    //Inserting single document
    db.collection("users").insertOne(
      {
        //  here we set our object id manually and the value is the id variable created above
        _id: id,
        name: "Ayobami",
        age: 35
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

    //  Inserting multiple documents
    /*    db.collection("users").insertMany(
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
        );*/

    //  Inserting 3 tasks in a new task collection
    /*    db.collection("tasks").insertMany(
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
        );*/
  }
);

/*Running the app : -
5d70b816ba1a691abc5a4f18
2019-09-05T07:24:06.000Z
[ { _id: 5d70b816ba1a691abc5a4f18, name: 'Ayobami', age: 35 } ]


We just show this to show that it is possible, we wont be generating the id ourselves*/

/*HOW OBJECT ID ARE STORED.
Inside robo3t, in the _id field, we have our id stored as : ObjectId("5d70b816ba1a691abc5a4f18")

This is a function call and the string is provided as the only argument.
*/

//EXTRACTING THE RAW BINARY INFORMATION OF OUR OBJECT IDs
//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//A function to generate a new id for us
const id = new ObjectID();
//Extracting the binary info of our id
console.log(id.id);

/*Running this returns : - <Buffer 5d 70 b9 59 65 dc a6 18 14 75 4c e2>*/

//GETTING THE SIZE OF THE OBJECTID BINARY DATA
//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//A function to generate a new id for us
const id = new ObjectID();
//Getting the size of the objectID
console.log(id.id.length); //This returns 12

//GETTING THE STRING REPRESENTATION AND THE SIZE OF THE STRING
//Loading mongodb
const mongodb = require("mongodb");
//This gvs us the function necessary to connect to the db and perform CRUD
const MongoClient = mongodb.MongoClient;
//responsible for objectID manual generator
const ObjectID = mongodb.ObjectID;

//Destructuring shorthand
// const {MongoClient, ObjectID} = require("mongodb");

//A function to generate a new id for us
const id = new ObjectID();
//the length of the binary representation
console.log(id.id.length);
//converting the binary to string representation which mongodb driver does
console.log(id.toHexString());
//the length of the string representation
console.log(id.toHexString().length);

/*Runing the app, we get : -
12
5d70ba217882fd1f987f8b9d
24
*/

/*We spent so much time learning about object id so that we will be able to fetch our document by ID "read" operation.*/
