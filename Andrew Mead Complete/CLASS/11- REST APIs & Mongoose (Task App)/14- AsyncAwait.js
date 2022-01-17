/*ASYNC/AWAIT is the third way of handling async request. We have covered handling async request via : - Callbacks, Promise and now Async/Await. Async/Await is one of the best improvement to JS which makes it easy to work with async promise based code and allows us to write async codes as if they are sync codes.
It is not a new bunch of tools which needs us to transform from promises to async/await like we did from callbacks to promises so we will still be using our promises we have used before and the only thing that will change is how we manage our codes when we have a lot of things going on.
We will be using the AsyncAwait in every route handler.
To learn about it, we will be using the playground folder inside the root dir : - "8-async-await.js"*/

//simple function doing nothing
const doWork = () => {};

console.log(doWork()); //This returns "undefined"

//ASYNC/AWAIT OPERATOR
//To use async/Await, we mark a function as "async" and inside that function we can use "await"
const doWork2 = async () => {};

console.log(doWork2());
/*Running the app : - This returns a promise
Promise { undefined }

So async functions always return a promise and the promise returns the value the developer choose to return from the function*/

//Returning a value for our async/await promise
const doWork2 = async () => {
  return "Michaelz";
};

console.log(doWork2());
/*Running the app : -
Promise { 'Michaelz' }

Now we can use then & catch to handle our promise that Async returns*/

const doWork2 = async () => {
  return "Michaelz";
};

doWork2()
  .then(result => {
    console.log("Result " + result);
  })
  .catch(e => {
    console.log("error " + e);
  });

/*Runing the app: -
Result Michaelz*/

//GETTING OUR CATCH BLOCK TO RUN TO GET AN ERROR
const doWork2 = async () => {
  //throwing an error so we can catch it
  throw new Error("Something went wrong!");
  // return "Michaelz";
};

doWork2()
  .then(result => {
    console.log("Result " + result);
  })
  .catch(e => {
    console.log(e);
  });

/*Error: Something went wrong!*/

/*THE AWAIT OPERATOR : - This can only be used in async functions which means we must first prefix our functions with the "async" keyword before we can then use the "await"

To test this out, we will bring one of our playground code we created for promise*/

//Promise function
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

//Async function that calls the "add" promise function
const doWork = async () => {
  const sum = await add(1, 99);
  return sum;
};

//Handling the resolve and reject of our doWork async function
doWork()
  .then(result => {
    console.log("Result " + result);
  })
  .catch(e => {
    console.log(e);
  });

/*Running the file, after two seconds we get : -  Result 100*/

/*ASYNC/AWAIT CHAINING*/

//Promise function
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

//Async function that calls the "add" promise function
const doWork = async () => {
  //3 async chained tasks with each running after 2 seconds which means we need to wait for a total of 6seconds to get the final result of "sum3"
  const sum = await add(1, 99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, 3);
  return sum3;
};

//Handling the resolve and reject of our doWork async function
doWork()
  .then(result => {
    console.log("Result " + result);
  })
  .catch(e => {
    console.log(e);
  });

/*Running the app, after 6 seconds, we get our result : - 153*/

/*HANDLING ASYNC/AWAIT REJECTION FROM ONE OF THE PROMISES IN THE CHAIN
We can add a conditional statement to our add function so that if a negative value is passed, it should throw and error then we try to pass a negative figure to one of our "await" function call and see the output*/

//ERROR ON THE 3RD MEMBER OF THE CHAIN
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //if any of the argument passed is a negative number, we reject the operation and return
      if (a < 0 || b < 0) {
        return reject("Numbers must be non-negative!");
      }
      resolve(a + b);
    }, 2000);
  });
};

//Async function that calls the "add" promise function
const doWork = async () => {
  //3 async chained tasks with each running after 2 seconds which means we need to wait for a total of 6seconds to get the final result of "sum3"
  const sum = await add(1, 99);
  const sum2 = await add(sum, 50);
  //passing a negative value for sum3 second argument to test for error
  const sum3 = await add(sum2, -3);
  return sum3;
};

//Handling the resolve and reject of our doWork async function
doWork()
  .then(result => {
    console.log("Result " + result);
  })
  .catch(e => {
    console.log(e);
  });

/*Because the error occured on the 3rd member of the function chain, we still waited for 6seconds before the error was displayed : -

Numbers must be non-negative!
*/

//ERROR FROM THE FIRST MEMBER OF THE FUNCTION CHAIN

//Promise function
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //if any of the argument passed is a negative number, we reject the operation and return
      if (a < 0 || b < 0) {
        return reject("Numbers must be non-negative!");
      }
      resolve(a + b);
    }, 2000);
  });
};

//Async function that calls the "add" promise function
const doWork = async () => {
  //passing a negative value the first function in the chain
  const sum = await add(1, -99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, -3);
  return sum3;
};

//Handling the resolve and reject of our doWork async function
doWork()
  .then(result => {
    console.log("Result " + result);
  })
  .catch(e => {
    console.log(e);
  });

/*Here we only had to wait for 2 seconds before we got the error because since the error occurred on the first member, the rest functions was skipped.*/
