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
      resolve({ id: id, gitHubUsername: "mosh" });

      // simulating error
      // reject(new Error("Could not get the repos."));
    }, 2000);
  });
}

function getRepositories() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API.....");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API....");
      resolve(["commit"]);
    }, 2000);
  });
}
