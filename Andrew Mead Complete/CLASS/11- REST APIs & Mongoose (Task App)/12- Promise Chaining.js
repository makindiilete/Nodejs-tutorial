/*We will take a break from building the rest api and cover a mor advanced promised concept. This is PROMISE CHAINING.

We have been using Promises so far and every time we use them, we perform a single async operation e.g. To either find a User or post a new task. With promise chaining, we can do one thing first and then the next e.g. We can find a user and when that async operation is complete, we post a new task, or we fetch all tasks and after we fetch the total task that are incomplete just like callback chaining for geocode and then fetching forecast.
We will explore this inside the "7-promises.js" playground file*/

//PROMISE CHAINING WITH A SINGLE ASYNC OPERATION
//Normal promise scenario
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

add(1, 2)
  .then(sum => {
    console.log(sum);
  })
  .catch(e => {
    console.log(e);
  }); //This returns 3

/*WE HAVE TWO METHODS WITH WHICH WE CAN PERFORM PROMISE CHAINING. THE FIRST METHOD IS NOT ADVISABLE BECAUSE IT CAN GET COMPLEX AND CONFUSING WHEN WE HAVE MORE THAN 2 ASYNC OPERATIONS*/

//Normal promise scenario
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

//PROMISE CHAINING FIRST METHOD
//First async operation
add(1, 2)
  .then(sum => {
    console.log(sum);
    //2nd nested async operation
    add(sum, 5)
      .then(sum2 => {
        console.log(sum2);
      })
      .catch(e => {
        console.log(e);
      });
  })
  .catch(e => {
    console.log(e);
  });
/*If we run the program, after 2 seconds we get the result of the first async operation and after another 2 seconds we get the result of the 2nd async operation.*/

//USING PROMISES

/*
//A promise takes two args : - "resolve" & "reject". Resolve for positive scenario & reject for negative scenario
const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([7, 4, 1]);
    reject("Things went wrong!");
  }, 2000);
});

//.then is called when a promise is resolved
doWorkPromise
  .then(result => {
    console.log("Success!", result);
  })
  //  .catch is called when the promise is rejected.
  .catch(error => {
    console.log("Error", error);
  });
*/

//Normal promise scenario
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

//PROMISE CHAINING 2ND METHOD (MODERN)
//first async then call
//first operation to perform
add(1, 1)
  .then(sum => {
    console.log(sum);
    //2nd operation to perform
    return add(sum, 4);
  })
  //second async then call
  .then(sum2 => {
    console.log(sum2);
  })
  .catch(e => {
    console.log(e);
  });

/*Now we can see this method is clear and not nested and with it we can change as many async operations as possible.*/

/*Now that we know how promise chaining works, we can use it with mongoose by creating a new folder inside our task-manager root directory "playground" and a new file "promise-chaining.js". We are creating this playground because there are no use case for it yet in the task app*/

/*THE TASK : - We will change the age for a user and then fetch the total number of other users that has that same age*/

//promise-chaining.js
//loading our mongoose.js file where we connect to database
require("../src/db/mongoose");
//loading in the user model
const User = require("../src/models/users");
/**/

//5d71777adfbaa6310c04e580
//First async finds the user by id and update. 2 args : the id to search for and the object to update with
User.findByIdAndUpdate("5d71777adfbaa6310c04e580", { age: 1 })
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
  });

/*Running the app :
//Result from first async

{ age: 0,
  _id: 5d71777adfbaa6310c04e580,
  name: 'Oluwamayowa',
  email: 'akindiileteforex@gmail.com',
  password: '123999abc',
  __v: 0 }

//Result from 2nd async
1
*/

/*Now if we pick another user with the age of 0 and update the age to 1 with their id, we should now get "2" as the result of the 2nd async operation*/
//loading our mongoose.js file where we connect to database
require("../src/db/mongoose");
//loading in the user model
const User = require("../src/models/users");
/**/

//5d71777adfbaa6310c04e580
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
  });

/*THE WARNING WE SAW : - DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.

This error is not from us but from mongoose because we are using non-deprecated updating version but mongoose takes this and sometimes uses an old method. We can fix this by : -

1-  Go to your mongoose file "db/mongoose.js"
2-  Add another option "useFindAndModify: false"*/

//mongoose.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
  useCreateIndex: true,
  //  correcting findAndModify deprecation warning
  useFindAndModify: false
});
