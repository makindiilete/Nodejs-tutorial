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
