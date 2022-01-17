// Testing strings
module.exports.greet = function(name) {
  return "Welcome " + name;
};

//TEST
describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Michaelz Omoakin");
    expect(result).toBe("Welcome Michaelz Omoakin");
  });
});

/*RESULT
 PASS  tests\lib.test.js
  absolute
    √ should return a positive number if input is positive (17ms)
    √ should return a positive number if input is negative (2ms)
    √ should return 0 if input is 0 (1ms)
  greet
    √ should return the greeting message (2ms)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |    46.67 |    33.33 |    18.18 |       50 |                   |
 db.js    |    28.57 |      100 |        0 |    28.57 |        3,4,8,9,10 |
 lib.js   |    52.38 |    33.33 |    28.57 |    57.89 |... 28,33,35,40,42 |
 mail.js  |       50 |      100 |        0 |       50 |                 3 |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        4.799s


Our test passed but there is a problem with the current implementation. Our test is too specific and it can easily break if we add just a single string to the greet function: i.e FROM

module.exports.greet = function(name) {
  return "Welcome " + name;
};

TO

module.exports.greet = function(name) {
  return "Welcome " + name + "!";
};

If we run this test, we will get the error



 FAIL  tests\lib.test.js
  greet
    × should return the greeting message (57ms)

  ● greet › should return the greeting message

    expect(received).toBe(expected) // Object.is equality

    Expected value to be:
      "Welcome Michaelz Omoakin"
    Received:
      "Welcome Michaelz Omoakin!"

      24 |   it("should return the greeting message", () => {
      25 |     const result = lib.greet("Michaelz Omoakin");
    > 26 |     expect(result).toBe("Welcome Michaelz Omoakin");
      27 |   });
      28 | });
      29 |

      at Object.toBe (tests/lib.test.js:26:20)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |    46.67 |    33.33 |    18.18 |       50 |                   |
 db.js    |    28.57 |      100 |        0 |    28.57 |        3,4,8,9,10 |
 lib.js   |    52.38 |    33.33 |    28.57 |    57.89 |... 28,33,35,40,42 |
 mail.js  |       50 |      100 |        0 |       50 |                 3 |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 failed, 1 total
Tests:       1 failed, 3 passed, 4 total
Snapshots:   0 total
Time:        6.454s


So the lesson here is that, our test should not be too specific or too general, so they should be balance.

So how do we balance this test so it wont be too specific nor too generous? we can simply use regular expression.
*/

//CORRECTING TOO SPECIFIC TEST STRINGS WITH REGULAR EXPRESSION
//Testing for strings
describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Michaelz Omoakin");
    //using regular expression which means, as long as we have this name in the greeting, we are okay
    expect(result).toMatch(/Michaelz Omoakin/);
  });
});

/*RESULT:
 PASS  tests\lib.test.js
  absolute
    √ should return a positive number if input is positive (14ms)
    √ should return a positive number if input is negative (3ms)
    √ should return 0 if input is 0 (1ms)
  greet
    √ should return the greeting message (2ms)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |    46.67 |    33.33 |    18.18 |       50 |                   |
 db.js    |    28.57 |      100 |        0 |    28.57 |        3,4,8,9,10 |
 lib.js   |    52.38 |    33.33 |    28.57 |    57.89 |... 28,33,35,40,42 |
 mail.js  |       50 |      100 |        0 |       50 |                 3 |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        5.901s

So even if you remove the "!" from the function, the test will still passed.
If you dont want to use regular expression, another matcher you can use is "toContain"
 */

//Testing for strings
describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Michaelz Omoakin");
    expect(result).toContain("Michaelz Omoakin");
  });
});

/*RESULT:
 PASS  tests\lib.test.js
  absolute
    √ should return a positive number if input is positive (19ms)
    √ should return a positive number if input is negative (2ms)
    √ should return 0 if input is 0 (1ms)
  greet
    √ should return the greeting message (2ms)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |    46.67 |    33.33 |    18.18 |       50 |                   |
 db.js    |    28.57 |      100 |        0 |    28.57 |        3,4,8,9,10 |
 lib.js   |    52.38 |    33.33 |    28.57 |    57.89 |... 28,33,35,40,42 |
 mail.js  |       50 |      100 |        0 |       50 |                 3 |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        5.209s


SO WHEN TESTING STRINGS, MAKE SURE YOUR TESTS ARE NOT TOO SPECIFIC

*/
