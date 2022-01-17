/*We will explore callbackfn in details. We will explore how it really works and how we can take advantage of it to create our own. This is important because it is at the core of async development and will come up over and over again throughout the class.*/
//EXAMPLE
setTimeout(() => {
  console.log("Two seconds are up");
}, 2000);

/*Here we have a single callback function which we pass as an argument to the setTimeout function and so this leads us to the definition of a callback function.

CALL BACK FUNCTION : - This is a function we pass as an argument to another function with the intention of having it called later on.

In this example, we are using the callbackfn in async way, callbackfn is node provided API and it is indeed async but that does not mean everytime we use the callbackfn that it is indeed async. This use to cause confusion for people because here we used setTimeout to pass our callbackfn and we know that setTimeout is async but when using callbackfn in array methods like "forEach()" this is indeed sync.*/

//Using callbackfn in async
setTimeout(() => {
  console.log("Two seconds are up");
}, 2000);

//Using callbackfn in sync
const names = ["Andrew", "Jane", "Jess"];
const shortNames = names.filter(name => name.length <= 4);

/*Currently, in our geocode app, if we need to geocode for 5 locations then  we need to re-copy the code in 5 places which is not ideal we can use the callback concept to easily correct this.*/

//sync version of geocode callback
const geocode = (address, callback) => {
  const data = {
    latitude: 0,
    longitude: 0
  };
  return data;
};

const data = geocode("Lagos");
console.log(data);

//async version of geocode callback
const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0
    };
    callback(data);
  }, 2000);
};

const data = geocode("Lagos", data => {
  console.log(data);
});

/*
Two seconds are up
{ latitude: 0, longitude: 0 }
*/

/*CHALLENGE : - Mess around with the callback function
1-  Define an add function that accepts the correct arguments
2-  Use setTimeout to simulate a 2 second delay
3-  After 2 seconds are up, call the callback function with the sum
4-  Test your work.*/

const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
};

add(1, 4, sum => {
  console.log(sum);
}); //RESULT = 5
