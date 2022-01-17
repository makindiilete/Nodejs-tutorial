/*We will see a simple solution to resolve the call back hell problem : - */

//PREVIOUS CALL BACK HELL CODE
console.log("Before");
getUser(1, function(user) {
  getRepositories(user.gitHubUsername, repo => {
    getCommits(repo, commits => {
      //CALLBACK HELL
    });
  });
});
console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    // we give the user object to the callback
    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API.....");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

//REFACTORED CLEANER CODE WITH NAMED FUNCTIONS
console.log("Before");
getUser(1, getRepositories);
console.log("After");

////////////////////////////////////////////////////////////////////
////////////// NAMED FUNCTIONS  ///////////////////////////////////
function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repo) {
  getCommits(repo, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}
///////////////////////////////////////////////////////////////////

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

/*This can look confusing looking at the name functions because we are calling two different functions with the same name but as you can see that their parameters are different....
 *
 * There is a better way of working with async operation which is what we will check next*/
