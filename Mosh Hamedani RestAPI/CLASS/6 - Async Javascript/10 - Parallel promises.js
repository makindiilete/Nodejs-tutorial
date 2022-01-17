/*Sometimes you want to run multiple async operations in parallel and when they all completes, you want to something in after for example : - You may call different APIs like facebook API and twitter API and when the result of both this async operations are ready, the you want to return something to the client.*/

//simulation for calling facebook api
const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 2000);
});

//simulation for calling twitter api
const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

//when the async operations p1 & p2 completes, we want to execute this
Promise.all([p1, p2]).then(result => console.log(result));

/*RESULT : -

Async operation 1...
Async operation 2...
[ 1, 2 ]

The operations gets resolve almost at the same time and their results will be available as an array.
What if one of these promises fails? Let us simulate what happens if one of the promises fails
*/

//simulation for calling facebook api
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    reject(new Error("because something failed....."));
  }, 2000);
});

//simulation for calling twitter api
const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

//when the async operations p1 & p2 completes, we want to execute this
Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(error => console.log("Error", error.message));

//Result : -
/*
Async operation 1...
Async operation 2...
Error because something failed.....

So if one of the promises fails, the whole promises is considered to fail.
*/

/*Sometimes you want to kick off multiple async operations but you want to do something as soon as one of these async operations completes, you dont want all of them to complete, you just want to do something as soon as the first operation completes.*/

//simulation for calling facebook api
const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 2000);
});

//simulation for calling twitter api
const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

//here as soon as the two async operations completes, we return the value of the first fulfilled promise
Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(error => console.log("Error", error.message));

//When we run the app we get : -
/*

Async operation 1...
Async operation 2...
1
*/
