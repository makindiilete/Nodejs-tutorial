/*We want to write a unit test for this function below*/

// Testing numbers - a function dt takes a number as arg
module.exports.absolute = function(number) {
  //if the no is +ve (2), we return the number (2)
  if (number > 0) return number;
  //if the no is -ve (-1), we return the number as +ve (1)
  if (number < 0) return -number;
  //if the number is not +ve or -ve, that means the number is 0 and we return 0
  return 0;
};

/*How many unit test do we need here? You unit test should be greater than or equal to the number of your execution parts. In this case we have 3 execution parts so our unit tests should be 3 or more because we want to make sure that all execution parts are covered.*/

//TESTS

//loading the function we want to test
const lib = require("../lib");

//1st arg = test name, 2nd arg = function where we implement our test i.e. jest will call ds function when we run our test
test("absolute - should return a positive number if input is positive", () => {
  //   here we are testing for the number so we supply a simple no as parameter
  const result = lib.absolute(1);
  // verifying that ds result is correct i.e. the result === 1
  //  "toBe" here is a matcher
  expect(result).toBe(1);
});

test("absolute - should return a positive number if input is negative", () => {
  //   here we are testing for the number so we supply a simple no as parameter
  const result = lib.absolute(-1);
  // verifying that ds result is correct i.e. the result === 1
  //  "toBe" here is a matcher
  expect(result).toBe(1);
});

test("absolute - should return 0 if input is 0", () => {
  //   here we are testing for the number so we supply a simple no as parameter
  const result = lib.absolute(0);
  // verifying that ds result is correct i.e. the result === 1
  //  "toBe" here is a matcher
  expect(result).toBe(0);
});

/*RESULT:
 PASS  tests\lib.test.js
  √ absolute - should return a positive number if input is positive (13ms)
  √ absolute - should return a positive number if input is negative (4ms)
  √ absolute - should return 0 if input is 0 (1ms)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |       50 |       50 |     9.09 |    48.39 |                   |
 db.js    |    28.57 |      100 |        0 |    28.57 |        3,4,8,9,10 |
 lib.js   |       56 |       50 |    14.29 |    54.55 |... 35,37,38,43,45 |
 mail.js  |       50 |      100 |        0 |       50 |                 3 |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        5.31s

*/

//USING TEST FOR DEBUGGING : Now let us try to enter pass "-2" as expected result in the 3rd test and see what happens

//TEST
//loading the function we want to test
const lib = require("../lib");

test("absolute - should return a positive number if input is positive", () => {
  const result = lib.absolute(1);
  expect(result).toBe(1);
});

test("absolute - should return a positive number if input is negative", () => {
  const result = lib.absolute(-1);
  expect(result).toBe(1);
});

test("absolute - should return 0 if input is 0", () => {
  const result = lib.absolute(0);
  // expected result = 0 but we entered -2 as "toBe"
  expect(result).toBe(-2);
});

/*
RESULT:
 FAIL  tests\lib.test.js
  √ absolute - should return a positive number if input is positive (13ms)
  √ absolute - should return a positive number if input is negative (2ms)
  × absolute - should return 0 if input is 0 (35ms)

  ● absolute - should return 0 if input is 0

    expect(received).toBe(expected) // Object.is equality

    Expected value to be:
      -2
    Received:
      0

      24 |   // verifying that ds result is correct i.e. the result === 1
      25 |   //  "toBe" here is a matcher
    > 26 |   expect(result).toBe(-2);
      27 | });
      28 |

      at Object.toBe (tests/lib.test.js:26:18)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |       50 |       50 |     9.09 |    48.39 |                   |
 db.js    |    28.57 |      100 |        0 |    28.57 |        3,4,8,9,10 |
 lib.js   |       56 |       50 |    14.29 |    54.55 |... 35,37,38,43,45 |
 mail.js  |       50 |      100 |        0 |       50 |                 3 |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 failed, 1 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   0 total
Time:        4.946s



So here we have enough information to easily debug our app knowing where the error occurs and the reason. Sometimes the problem is in your test (true for this case scenario) while sometimes the problem is in your production code.
*/
