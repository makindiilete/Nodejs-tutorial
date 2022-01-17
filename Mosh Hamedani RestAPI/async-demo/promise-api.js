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
