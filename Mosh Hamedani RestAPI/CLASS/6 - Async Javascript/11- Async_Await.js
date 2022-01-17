/*We have learnt about handling async operations with callbacks, promises and now we want to learn about a better way of handling async operations using Async/Await.
 *
 * Async/Await helps us to write async codes like sync code : - */

//PROMISES & ASYNC/AWAIT COMPARISON
// Promise approach
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repo => getCommits(repo[0]))
  .then(commits => console.log("Commits", commits))
  .catch(err => console.log("Error", err.message));

//Async and Await approach
async function displayCommits() {
  const user = await getUser(1);
  const repo = await getRepositories(user.gitHubUsername);
  const commits = await getCommits(repo[0]);
  console.log(commits);
}
displayCommits();

//Seeing this two approaches, you can see the async & await approach is better, cleaner, more readable and easier to work with than callbacks and promises.

/*Async & Await is built on promise, if you inspect the "displayCommits()" in vscode, you get "promise<void>" so at run time, our async/await approach will be converted to the promise approach. So the "await" keyword in our code is the one that releases the restaurant waiter to attend to other clients while the chef prepares your meal*/

//CATCHING ERROR WITH ASYNC & AWAIT USING TRY CATCH BLOCK

//APP.JS FILE
console.log("Before");

//Async and Await approach with try & catch
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repo = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repo[0]);
    console.log(commits);
  } catch (error) {
    console.log("Error : -", error.message);
  }
}
displayCommits();

console.log("After");

// async operation function : - we removed the callback arg
function getUser(id) {
  return new Promise((resolve, reject) => {
    // kick off some async work
    setTimeout(() => {
      console.log("Reading a user from a database");
      // resolve({ id: id, gitHubUsername: "mosh" });

      // simulating error
      reject(new Error("Could not get the repos."));
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

/*If we run the app now, we get : -

Before
After
Reading a user from a database
Error : - Could not get the repos.
*/
