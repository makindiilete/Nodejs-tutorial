/*Here will be learn how to use a callback to get the user object that was not yet available when we called it in the last lecture


CALLBACK : - A callback is a function we are going to call when the result of async operation is ready.*/

console.log("Before");
//now we have 2 args : id & callback. When the result of the async operation is ready, the callback function will be called
getUser(1, function(user) {
  console.log("User", user);
});
console.log("After");

// async operation function : - 2 args : id & callback
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    // we give the user object to the callback
    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
}

//USING ARROW FUNCTION
console.log("Before");
//now we have 2 args : id & callback. When the result of the async operation is ready, the callback function will be called
getUser(1, user => {
  console.log("User", user);
});
console.log("After");

// async operation function : - 2 args : id & callback
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    // we give the user object to the callback
    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
}

//RESULT : -
/*If we run the program now we get this : -

Before
After
Reading a user from a database
User {id: 1, gitHubUsername: 'mosh'}

*/

//Assignment : - Convert the sync function below to async operation with callback
function getRepositories(username) {
  return ["repo1", "repo2", "repo3"];
}

//MY SOLUTION
console.log("Before");
//now we have 2 args : id & callback. When the result of the async operation is ready, the callback function will be called
getUser(1, function(user) {
  console.log("User", user);
});
//assignment
getRepositories("mosh", repo => {
  console.log("Repositories: ", repo);
});
console.log("After");

// async operation function : - 2 args : id & callback
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    // we give the user object to the callback
    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
}

//Assignment
function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Reading available repositories from a database");
    callback(["repo1", "repo2", "repo3"]);
  }, 4000);
}

//RESULT AT RUN TIME
/*
Before
After
Reading a user from a database
User { id: 1, gitHubUsername: 'mosh' }
Reading available repositories from a database
Repositories:  [ 'repo1', 'repo2', 'repo3' ]
*/

//MOSH SOLUTION
console.log("Before");
//now we have 2 args : id & callback. When the result of the async operation is ready, the callback function will be called
getUser(1, function(user) {
  //'user.gitHubUsername' : - We already have a user in the user function so we can simply call it to return the username instead of hardcoding it
  getRepositories(user.gitHubUsername, repo => {
    console.log("Repositories: ", repo);
  });
});
console.log("After");

// async operation function : - 2 args : id & callback
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    // we give the user object to the callback
    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
}

//Assignment
function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API.....");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
