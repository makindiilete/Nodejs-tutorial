/*CHALLENGE : - Create two new functions for users
 * 1-  Create getUser
 *       Accept id and return user object (or undefined)
 * 2-  Create getUsersInRoom
 *       Accept room name and return array of users (or empty array)
 * 3-  Test your work by calling the functions!*/

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

//GET USER
const getUser = id => {
  const user = users.find(user => user.id === id);
  if (user) {
    return { user };
  }
};

//GET ALL USERS IN ROOM
const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  const usersArray = users.filter(user => user.room === room);
  if (usersArray) {
    return usersArray;
  }
};

//calling and adding a user
addUser({
  id: 22,
  username: "Michaelz",
  room: "Lagos"
});
addUser({
  id: 33,
  username: "Damilola",
  room: "Lagos"
});
addUser({
  id: 44,
  username: "Omoakin",
  room: "Lagos"
});
console.log("USERS", users);
console.log("----------------------------------------------------------");
console.log(getUser(33));
console.log("-----------------------------------------------------------");
console.log(getUsersInRoom("Lagos"));

/*USERS [ { id: 22, username: 'michaelz', room: 'lagos' },
  { id: 33, username: 'damilola', room: 'lagos' },
  { id: 44, username: 'omoakin', room: 'lagos' } ]
----------------------------------------------------------
{ user: { id: 33, username: 'damilola', room: 'lagos' } }
-----------------------------------------------------------
[ { id: 22, username: 'michaelz', room: 'lagos' },
  { id: 33, username: 'damilola', room: 'lagos' },
  { id: 44, username: 'omoakin', room: 'lagos' } ]*/

//USERS.JS
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

//GET USER
const getUser = id => {
  const user = users.find(user => user.id === id);
  if (user) {
    return { user };
  }
};

//GET ALL USERS IN ROOM
const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  const usersArray = users.filter(user => user.room === room);
  if (usersArray) {
    return usersArray;
  }
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};
