/*Currently in the last assignment solution (solution by mosh), we have the 'getRepositories(){}" function nested inside the getUser. Let us assume we want to read all the commits inside one of the repositories, then we will have another function called "getCommits" which will also be nested inside the "getRepositories" function and we will end up with something like this : -

getUser(1, function(user) {
  getRepositories(user.gitHubUsername, repo => {
      getCommits(repo, (commits) => {
          //CALLBACK HELL
      });
  });
});

In a real world app, this can get longer and it starts to look like xmas tree. Lets compare it to a sync version which looks neater and more readable : -

console.log('Before');
const user = getUser(1);
const repos = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);
console.log('After');

As you can see this look cleaner and more readable because we dont have any nested structure.
 We will see how to fix callback hell in async operation in next video
*/
