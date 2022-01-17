//Let us make the program a little realistic.

console.log("Before");
//calling the 'getUser' function to get the result of the async operation
const user = getUser(1);
// we want to display the user details to the client
console.log(user);
console.log("After");

// async operation function
function getUser(id) {
  setTimeout(() => {
    //  we display message that we are reading a user
    console.log("Reading a user from a database");
    // we then display the user object to the client
    return { id: id, gitHubUsername: "mosh" };
  }, 2000);
}

/*If we run the program, we might expect to get the user details but the result will be : -

Before
undefined
After
Reading a user from a database

Our user returns "undefined" even though we have it defined in the function. Why? This is because the user object will not be available as at the time the code to get the user "const user = getUser(1)" is called, the user details is in the function and its not yet available so we returned "undefined". In order to solve this, we use "Async patterns" and we have three types : -

1) Callbacks
2) Promises
3) Async/await
*/
