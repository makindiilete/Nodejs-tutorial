//Now we want to go back to our app.js files and replace the callbacks we have used with promises

//APP.JS FILE
console.log("Before");
getUser(1, user => {
  getRepositories(user.gitHubUsername, repo => {
    getCommits(repo[0], commits => {
      console.log(commits);
    });
  });
});
console.log("After");

///////////////////////////////////////////////////////////////////
/////// REPLACING CALL BACKS WITH PROMISES ///////////////////////

// async operation function : - we removed the callback arg
function getUser(id) {
  return new Promise((resolve, reject) => {
    // kick off some async work
    setTimeout(() => {
      console.log("Reading a user from a database");
      // we replaced the "callback" with "resolve"
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API.....");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API....");
      resolve(["commit"]);
    }, 2000);
  });
}
