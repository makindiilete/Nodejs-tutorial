/* We want to explore the API of promises in more details

1) Create a new file "promise-api.js"

Sometimes you want to create a promise that is already resolved, this is particularly useful when writing unit test so you want to simulate a scenario where an async operation like calling a web service completes successfully. So in your unit test, you want to create a promise that is already resolved. Let us see how to get that done.
*/

//Creating an already resolved promise

// This returns a promise that is already resolved
const p = Promise.resolve({ id: 1 });

p.then(result => console.log(result));

//RESULT : - In the terminal we get : {id: 1}

//Creating an already rejected promise (containing error)

// This returns a promise that is already rejected
const p = Promise.reject(new Error("reason for rejection...."));
p.catch(error => console.log(error));

// RESULT : - Simulating the error from a rejected promise

/*
Error: reason for rejection....
    at Object.<anonymous> (C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\async-demo\promise-api.js:2:26)
    at Module._compile (internal/modules/cjs/loader.js:688:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)
    at Module.load (internal/modules/cjs/loader.js:598:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)
    at Function.Module._load (internal/modules/cjs/loader.js:529:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:741:12)
    at startup (internal/bootstrap/node.js:285:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)

*/

//This can also be written as :
const p = Promise.reject("reason for rejection....");
p.catch(error => console.log(error));

//but in this case we will only get the message "reason for rejection...." in the terminal and we wont get those error codes which truly simulate and error so anytime we want to create already rejected error, we should use the error object "new Error("reason for rejection....")"
