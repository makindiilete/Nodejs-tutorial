/*Now we have replaced our callbacks with promises but we need to be able to consume this promises*/

//USING PROMISES TO GET USERS, REPOSITORIES & COMMITS

//Using promises to display resolve 'user'
getUser(1).then(user => console.log("User", user));

// Using promises to display resolved 'repositories'
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repo => console.log("Repo", repo));

// Using promises to display resolved 'commits'
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repo => getCommits(repo[0]))
  .then(commits => console.log("Commits", commits));

//APP.JS FILE
console.log("Before");

// Using promises to display resolved 'commits'
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repo => getCommits(repo[0]))
  .then(commits => console.log("Commits", commits))
  //  catching error
  .catch(err => console.log("Error", err.message));

console.log("After");

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

/* Compare this to the previous callback solution

//callback

getUser(1, user => {
  getRepositories(user.gitHubUsername, repo => {
    getCommits(repo[0], commits => {
      console.log(commits);
    });
  });
});

//promises
// Using promises to display resolved 'commits'
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repo => getCommits(repo[0]))
  .then(commits => console.log("Commits", commits))
  .catch(err => console.log("Error", err.message));

*/
