/*One of the benefits of this tests is that they allows us to refactor our codes with confidence.
 * With tests, we can refactor our code and run the tests and if all tests passed, we can be assured that our new implementation will work, without test, we will need to run the app and do a few clicks to get to a page where we have used this function.*/

//Now we have refactored our code

//FROM
// Testing numbers
module.exports.absolute = function(number) {
  if (number > 0) return number;
  if (number < 0) return -number;
  return 0;
};

//TO
// Testing numbers
module.exports.absolute = function(number) {
  //if number is greater or equal to 0, we return d number
  if (number >= 0) return number;
  //else d number is definitely -ve and we return it without the negative
  return -number;
};

/*TESTING THE REFACTORED CODE

 PASS  tests\lib.test.js
  absolute
    √ should return a positive number if input is positive (17ms)
    √ should return a positive number if input is negative (2ms)
    √ should return 0 if input is 0 (1ms)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |    46.88 |    33.33 |     9.09 |    48.28 |                   |
 db.js    |    28.57 |      100 |        0 |    28.57 |        3,4,8,9,10 |
 lib.js   |    52.17 |    33.33 |    14.29 |       55 |... 31,36,38,43,45 |
 mail.js  |       50 |      100 |        0 |       50 |                 3 |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        4.447s, estimated 5s

So we know that our refactored code work without running the app
*/

//CODE REFACTORED 2
// Testing numbers
module.exports.absolute = function(number) {
  return number >= 0 ? number : -number;
};

/*
RESULT
 PASS  tests\lib.test.js
  absolute
    √ should return a positive number if input is positive (25ms)
    √ should return a positive number if input is negative (3ms)
    √ should return 0 if input is 0 (6ms)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |    43.33 |    33.33 |     9.09 |    46.43 |                   |
 db.js    |    28.57 |      100 |        0 |    28.57 |        3,4,8,9,10 |
 lib.js   |    47.62 |    33.33 |    14.29 |    52.63 |... 28,33,35,40,42 |
 mail.js  |       50 |      100 |        0 |       50 |                 3 |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        6.02s


All our test still passed, so you can see unit test helps in refactoring your code with confidence.
*/
