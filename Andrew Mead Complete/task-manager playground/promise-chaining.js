//loading our mongoose.js file where we connect to database
require("../src/db/mongoose");
//loading in the user model
const User = require("../src/models/user");
/**/

/*//5d71777adfbaa6310c04e580
//First async finds the user by id and update. 2 args : the id to search for and the object to update with
User.findByIdAndUpdate("5d715ef92853200fbce15022", { age: 1 })
  .then(user => {
    console.log(user);
    //2nd async operation counts the number of documents have age of 1
    return User.countDocuments({ age: 1 });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });*/

//We want to get the user id and update their age so we take both id & age as args
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age });
  const count = await User.countDocuments({ age: age });
  return count;
};
updateAgeAndCount("5d715ef92853200fbce15022", 2)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
