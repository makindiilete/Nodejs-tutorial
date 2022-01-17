/*1) Download the project attached to this lecture which we will be using throughout this lecture.

2) Install Jest with "npm i jest@22.2.2 --save-dev" because it is not part of the production bundle.

3) Open the "package.json" file and change the "scripts" object to this :
  "scripts": {
    "jest": "jest --env=node --colors --coverage test",
    "test": "npm run jest"
  },

4) To run a test we simply run the code "npm test". Each test file has the extension of ".test.js"

5) We will be writing test for the "lib.js" file so we create a new "test" folder inside it we create a new file "lib.test.js"*/

//FIRST TEST

//1st arg = test name, 2nd arg = function where we implement our test i.e. jest will call ds function when we run our test
test("Our first test", () => {});

/*RESULT:
 PASS  tests\lib.test.js
  √ Our first test (7ms)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |  Unknown |  Unknown |  Unknown |  Unknown |                   |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        5.101s
Ran all test suites matching /test/i.

*/

//SECOND TEST
//1st arg = test name, 2nd arg = function where we implement our test i.e. jest will call ds function when we run our test
test("Our first test", () => {
  throw new Error("Something failed");
});

/*RESULT:
 FAIL  tests\lib.test.js
  × Our first test (42ms)

  ● Our first test

    Something failed

      1 | //1st arg = test name, 2nd arg = function where we implement our test i.e. jest will call ds function when we run our test
      2 | test("Our first test", () => {
    > 3 |   throw new Error("Something failed");
      4 | });
      5 |

      at Object.<anonymous>.test (tests/lib.test.js:3:9)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |  Unknown |  Unknown |  Unknown |  Unknown |                   |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        4.105s
Ran all test suites matching /test/i.

*/
