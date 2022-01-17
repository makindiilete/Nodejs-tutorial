/*GOAL : - In this lesson, we will setup various functions to keep track of our users overtime. That will allow us to start tracking them in "join" and the access the data later inside other event emitters.
1-  Inside the "utils" dir, create a new file "users.js", here we will keep track of our users in an array*/

//ADD USER
//tracking our users
//addUser : -  Allowing us to track a new user
// removeUser : - Stop tracking a user when they leave/ close their chat tab
// getUser : - Allow us to fetch existing user's data
// getUsersInRoom : - Fetch all users in a specific room (ds will allow us render their list to the sidebar)
const users = [];

const addUser = ({ id, username, room }) => {
  //Clean the data by removing space and coverting dem to lowercas
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  //Validate if the username & room exist
  if (!username || !room) {
    return {
      error: "Username and room are required"
    };
  }
  //Check for existing user to avoid duplicate username
  const existingUser = users.find(user => {
    return user.room === room && user.username === username;
  });
  //Validation to run if there is an existing user in a room
  if (existingUser) {
    return {
      error: "Username is in use!"
    };
  }
  //When a user pass all validations and ready to be stored
  const user = { id, username, room };
  //pushing the new user to d user list
  users.push(user);
  //returning the user
  return { user };
};

addUser({
  id: 22,
  username: "Michaelz",
  room: "Lagos"
});
console.log(users);

const res = addUser({
  id: 33,
  username: "Michaelz",
  room: "Lagos"
});
console.log(res);

/*
[ { id: 22, username: 'michaelz', room: 'lagos' } ]
{ error: 'Username is in use!' }
*/

/*REMOVE USERS : - */
//tracking our users
//addUser : -  Allowing us to track a new user
// removeUser : - Stop tracking a user when they leave/ close their chat tab
// getUser : - Allow us to fetch existing user's data
// getUsersInRoom : - Fetch all users in a specific room (ds will allow us render their list to the sidebar)
const users = [];

//ADD USER FUNCTION
const addUser = ({ id, username, room }) => {
  //Clean the data by removing space and coverting dem to lowercas
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  //Validate if the username & room exist
  if (!username || !room) {
    return {
      error: "Username and room are required"
    };
  }
  //Check for existing user to avoid duplicate username
  const existingUser = users.find(user => {
    return user.room === room && user.username === username;
  });
  //Validation to run if there is an existing user in a room
  if (existingUser) {
    return {
      error: "Username is in use!"
    };
  }
  //When a user pass all validations and ready to be stored
  const user = { id, username, room };
  //pushing the new user to d user list
  users.push(user);
  //returning the user
  return { user };
};

//REMOVE USER FUNCTION
const removeUser = id => {
  //if the id passed match the id of a user. findIndex() returns -1 if no match is found and return >= 0 if a match is found
  const index = users.findIndex(user => user.id === id);
  //if a match is found
  if (index !== -1) {
    //we remove the user from the users area. This return an array of all the removed items so we pick the first one using the "[0]"
    return users.splice(index, 1)[0];
  }
};

//calling and adding a user
addUser({
  id: 22,
  username: "Michaelz",
  room: "Lagos"
});
console.log("USERS", users);

//calling and removing a user
const removedUser = removeUser(22);
console.log("Remove user", removedUser);
console.log("USERS REMAINING AFTER REMOVE", users);

/*USERS [ { id: 22, username: 'michaelz', room: 'lagos' } ]
Remove user { id: 22, username: 'michaelz', room: 'lagos' }
USERS REMAINING AFTER REMOVE []*/
