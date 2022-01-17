/*We will look at js promises which are extrememly powerful when it comes with dealing with asyn code.


WHAT IS A PROMISE ? : - A promise is an object that holds the eventual result of an asynchronous operation. So when an async completes, it can result in a value or an error. A promise simply promises you that it will give you the result on an async operation. This promise object can be in three states : -

1) Pending : - This is the states it is when we create it
2) Fulfilled : - This is the states it is when it completes successfully
3) Rejected : - This is the state it is when the async operation is rejected/error

Let's see this in action.
1) Add a new file "promise.js"
*/

//a promise takes a function as an arg and the function takes 2 args "resolve & reject"
const p = new Promise((resolve, reject) => {
  //kick off some async work e.g. call a database, set timeout etc
  // ....
  //resolve(1)
  // reject(new Error('message'));
});

//SAMPLE
//a promise takes a function as an arg and the function takes 2 args "resolve & reject"
const p = new Promise((resolve, reject) => {
  // this will resolve and send '1' to the client at run time, in real world scenario, this may be the user object we read from the database
  resolve(1);
  // reject(new Error('message'));
});

//consuming/using the promise. ('then" is use to catch the result, 'catch' is used to catch errors)
p.then(result => console.log("Result", result));

//TEST ; - When you run the code you get : -
// Result 1

//ASYNC OPERATION WITH PROMISES
//a promise takes a function as an arg and the function takes 2 args "resolve & reject"
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
  // reject(new Error('message'));
});

//consuming/using the promise
p.then(result => console.log("Result", result));

//RUINING THIS WE GET '1' AFTER 2 SECONDS.

//CATCHING ERROR
//a promise takes a function as an arg and the function takes 2 args "resolve & reject"
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(1);
    reject(new Error("message"));
  }, 2000);
});

//consuming/using the promise using "then" to get the result and "catch" to catch error messages
p.then(result => console.log("Result", result)).catch(err =>
  console.log("Error", err.message)
);

//RUNNING THIS WE GET "Error message"

/*A promise is always in pending state when they are created at this point it kicks off async operation. That operation can complete successfully or fail. IF the promise completes successfully then it will go from
"pending => resolved, fulfilled."

if it fails then it will go from : -

"pending => rejected"
*/

/*ANYWHERE YOU HAVE ASYNC FUNCTION THAT TAKES A CALL BACK, YOU SHOULD MODIFY THAT FUNCTION TO RETURN A PROMISE.*/
