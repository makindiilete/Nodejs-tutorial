/*In this lesson, we will write tests that verifies that a given function is working as expected.
We will start by working with simple functions before moving on to testing the stuffs that exist in the task manager project.
1- We create a temporary file inside the src dir and name it "math.js". Let assume this file contains functions for calling math based operations we find ourselves forming throughout the application. For example :  A function that calculates the tip on a bill at a given restaurant e.g. if the bill is $50 and you want a tip of 20%, the function calculates how much that will be*/

//math.js
const calculateTip = (total, tipPercent) => {
  const tip = total * tipPercent; //if total is $50, tip% is 30% i.e. 50 * 0.3
  return total + tip; //tipPercent = 15, total = 50, 50 + 15
};

module.exports = {
  calculateTip
};

//math.test.js
//loading the math function from math.js file
const { calculateTip } = require("../src/math");

//2 args : - test name, d callbackfn dt runs to verify dt calculateTip function returns the right result given a set of input
test("Should Calculate total with tip", () => {
  //here we call the function we are testing and supply the args it requires
  //if things go well then we sud get 13, else it means something is wrong and the function is not working as expected.
  const total = calculateTip(10, 0.3);
  //if the function fails and we did not get d expected result
  if (total !== 13) {
    //we sud get 13 but if otherwise, we throw an arrow abt what we sud av gotten and what we got in return
    throw new Error("Total tip should be 13. But got " + total);
  }
});

/*Result : -
 PASS  tests/math.test.js (8.071s)
  √ Should Calculate total with tip (8ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        19.463s
Ran all test suites.

Now we can try to see how failure from this function will look like in our test by trying messing up with the code and adding another variable to the "tip" result*/

const calculateTip = (total, tipPercent) => {
  const tip = total * tipPercent + total; //using a wrong formula here to test for error
  return total + tip;
};

module.exports = {
  calculateTip
};

/*Running the test again, we get : -
 FAIL  tests/math.test.js
  × Should Calculate total with tip (37ms)

  ● Should Calculate total with tip

    Total tip should be 13. But got 23
Now this gives a good tip while the function failed above so we can dive into the code and check where the additional 10 came from and adjust the wrong formula.

For now, we are using an if....statement as a manual way of comparing the expected and returned value. Doing it with this manual way can get us tired when we are dealing with complex e.g. comparing all the properties an object returns with specific values.....This is where the term "assertions" comes into play.
ASSERTIONS : - A set of function/methods we can use to assert things about our values e.g. to assert dt a given value === another value, an array has 4 items inside of it.
*/

//USING JEST ASSERT LIBRARY TO REPLACE OUR IF.....STATEMENT

//math.js
const calculateTip = (total, tipPercent) => {
  const tip = total * tipPercent;
  return total + tip;
};

module.exports = {
  calculateTip
};

//math.test.js
//loading the math function from math.js file
const { calculateTip } = require("../src/math");

//2 args : - test name, d callbackfn dt runs to verify dt calculateTip function returns the right result given a set of input
test("Should Calculate total with tip", () => {
  //here we call the function we are testing and supply the args it requires
  const total = calculateTip(10, 0.3);
  //jest assertion expecting d variable "total" to be 13
  expect(total).toBe(13);
  /* //if the function fails and we did not get d expected result
  if (total !== 13) {
    //we sud get 13 but if otherwise, we throw an arrow abt what we sud av gotten and what we got in return
    throw new Error("Total tip should be 13. But got " + total);
  }*/
});

/*Now if we run our test, it passed successfully*/
//messing with the code again to test for error

//math.js
const calculateTip = (total, tipPercent) => {
  const tip = total * tipPercent + 5;
  return total + tip;
};

module.exports = {
  calculateTip
};

/*
Error: expect(received).toBe(expected) // Object.is equality

Expected: 13
Received: 18
*/

/*USING THE JEST ASSERTION DOCS : - You can check out other assertions you can use as you create your project by checking out the assertion docs on https://jestjs.io/docs/en/expect
There are a ton of fixtures available on this docs page which you can use.*/

/*REFACTORING : - Now that we have a test in place for our "calculateTip" function, we can refactor our code and run the test to confirm we have not broken anything.*/

const calculateTip = (total, tipPercent) => total + total * tipPercent;

module.exports = {
  calculateTip
};
/*Running the test again, it is passing which is good.*/

/*Now we want to tweak our function further by providing a default value for our tipPercent argument and write a new test to test for scenario where the value of tipPercent is not provided and instead we used the default value*/

//math.js
//adding a default value for tipPercent incase u dont provide a value
const calculateTip = (total, tipPercent = 0.25) => total + total * tipPercent;

module.exports = {
  calculateTip
};

//math.test.js
//loading the math function from math.js file
const { calculateTip } = require("../src/math");

//testing with a custom tipPercent value
test("Should Calculate total with tip", () => {
  //here we call the function we are testing and supply the args it requires
  const total = calculateTip(10, 0.3);
  //jest assertion expecting d variable "total" to be 13
  expect(total).toBe(13);
});

//testing with a default tipPercent value
test("Should calculate with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5); //expecting total to be (10 * 0.25 + 10)
});
