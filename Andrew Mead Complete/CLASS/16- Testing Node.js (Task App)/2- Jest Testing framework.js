/*
1-  Kicking off our testing nodejs section, we will be running our first test and exploring the tool we will be using to get this done.
2-  We will also be seeing why testing can be so essential whether it is a node app or any other programming language, you should be writing tests to verify that your project is always working as expected!

There are dozens of libraries that allows you to write test for nodejs abd we will explore two of them from which we will be picking one to use : -

1-  JEST FRAMEWORK : - This is the one we will be using and it can be found at https://jestjs.io. This is the one we will be using in the course
2-  MOCHA FRAMEWORK : - This is the second popular testing framework for nodejs which can be found at https://mochajs.org

1-  So we install jest : - npm i jest@23.6.0 --save-dev
2-  After installation, we set up a single new script to start up jest and jest is a zero configuration framework so it has everything to get us started without any configuration but there are options and args we can use to customized it as we want to change how jest works.
3-  In our script object inside package.json, create a new script "test":"jest"
4-  Run the test command with "npm test"
5-  Running the code, we get an error because it has  searched for all test files but found none.
6-  Create a new dir in the task-manager app which will house all our test files "tests" >>> Create a file to contain some test cases (this will be broken up across multiple files as we write more tests) "math.tests.js". We can pick this name to test a math function we have written.
7-  All test files for nodejs will have the ".test.js" extension.
8-  Now that we have a test file, if we run  the test again with "npm test" it is still going to fail but the error message is now different this time, it fails because our file doesnt contain any test code yet. So we can go ahead and write some test code.
*/

//math.test.js (Our first test case using an empty function)

//writing a test comes with the "test()" function which takes 2 args : (the test name and a callbackfn. The callbackfn is the code you want to write to verify that the given feature works as expected.)
test("Hello world", () => {});
/*Now if we run this test with npm test, we get back a success response : -
  PASS  tests/math.test.js
  √ Hello world (12ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.362s
Ran all test suites.


So even though this function does not, jest passed it. Why?
When we writ a test, we pass the test name and a function, if the test throws an error, it is considered a failure, if the function does not throw an error, then the test case is considered a success.*/

//success test case
test("Hello world", () => {});

//failure test case
test("This should fail", () => {
  throw new Error("Failure");
});

/*Now running the code again, the second test now fails and we get detailed info about the failure.
So when we create tests, all we do is creating functions, if everything works as expected, we do not throw an error, if something went wrong, we do throw an error. We could use this simple approach to test functions that adds up to numbers and we could also use this approach to try login to our express api with invalid credentials making sure we do not get an auth token back. So this simple principle will be able to be expanded into more complex real world scenarios.*/

/*WHY WRITE TESTS FOR OUR PROJECTS?
 *1- Saves time : - Yes you write more code but you write them once and can test it as many times as we like, you can come back in 5yrs time to run the same test code without doing any manual work whatsoever especially as your application grows, you need to rely on automatic test suites
 * 2-  Creates reliable software : - It makes it much easier to creates reliable code, you will be able to spot and fix bugs before they have shipped to production and mess up users.
 * 3-  Gives flexibility to developers : -
 *         Refactoring : - You can refactor with confidence as long as ur test cases still works, you know you have not broken anything but you only changed how something is done.
 *         Collaborating : - If someone is coming newly to work on your code, they might not understand all the fixtures available but when they are done, they can run the tests to ensure they have not broken anything when they change one area of the project.
 *         Profiling : - You will be able to see if the speed your test project runs goes up or down as you make changes, so you can make your application faster and faster over time.
 *4-  Peace of mind : - You know you already have an auto test suite you can run to verify your project in a matter of seconds. You wont need to go back to POSTMAN, firing up dozen of requests, changing things to make sure  we get the correct errors when bad data is provided. So with test you avoid any human error.*/

/*JEST FRAMEWORK SYNTAX EXPLANATION
Test Suites: This is the total number of tests files you have
Tests:       This is the total number of functions inside all the test suites/files
*/
