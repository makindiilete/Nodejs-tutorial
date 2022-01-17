/*We will take a break to talk about PROMISES.
Promises makes it easy for us to manage our async code and they were designed to solve many of the problems we run into when we use callbacks in our apps.

This means we will be dropping our callback functions and be using promises.
WHY?
Promises are like enhancements to callback making it easier to manage async code.
We will explore this in the playground dir.

We will open the "4-callbacks.js" & "7-promises.js" side by side to see the comparison*/

//4-callbacks.js
//ERROR PATTERN
const doWorkCallback = callback => {
  setTimeout(() => {
    callback("This is my error!", undefined);
  }, 2000);
};
doWorkCallback((error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(result);
});

/*This is my error!*/

//RESULT PATTERN
const doWorkCallback = callback => {
  setTimeout(() => {
    // callback("This is my error!", undefined);
    callback(undefined, [1, 4, 7]);
  }, 2000);
};
doWorkCallback((error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(result);
});

/*[1, 4, 7]*/

//PROMISES
//Success pattern
//A promise takes two args : - "resolve" & "reject". Resolve for positive scenario & reject for negative scenario
const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([7, 4, 1]);
  }, 2000);
});

//.then is called when a promise is resolved
doWorkPromise.then(result => {
  console.log("Success!", result);
});

/*Success! [ 7, 4, 1 ]*/

//ERROR PATTERN
//A promise takes two args : - "resolve" & "reject". Resolve for positive scenario & reject for negative scenario
const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([7, 4, 1]);
    reject("Things went wrong!");
  }, 2000);
});

//.then is called when a promise is resolved
doWorkPromise
  .then(result => {
    console.log("Success!", result);
  })
  //  .catch is called when the promise is rejected.
  .catch(error => {
    console.log("Error", error);
  });

/*Error Things went wrong!*/

/*With this scenario, its obvious that promises is easier to use, understand and cleaner than callbacks.*/
