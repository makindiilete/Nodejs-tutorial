/*In this lesson, the goal is to figure out how we can test async code using jest. This will look very similar to the way we have been testing our sync code only that we will be making little tweak to support testing async code.

//MAKING JEST TESTING AUTO-RUN
Similar to the way we used nodemon to auto re-run our codes when we make changes, we will also be making jest auto re-run our tests when we make changes to our test file. All you need to do is change the script to this : - "test": "jest --watch" >>> Now we can restart our test file.

You can explore more options available to use on the jest docs page >> API Reference >> Jest CLI Options
*/
//TESTING ASYNC
//the "done" parameter is needed for async test, we call d params when the function is complete. (The parameter can be named anything e.g. "next")
test("Async test demo", done => {
  setTimeout(() => {
    //we are testing whether 1 === 2 which is not
    expect(1).toBe(2);
    //we need to call d parameter under the code to run for jest to wait for the setTimeOut time and run the test correctly
    done();
  }, 2000);
});

/*Running the code, jest actually waited for 2 seconds then it ran the code and we got the failed test msg we expected.

  expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 1

Test Suites: 1 failed, 1 total
Tests:       1 failed, 4 passed, 5 total
Snapshots:   0 total
Time:        8.077s
Ran all test suites.
*/

/*There are other ways we can get this done instead of calling a parameter like "done" especially when it comes to working with promises and AsyncAwait.
 * To learn how to test asyncawait & promises, we can grab one of the functions we defined in the playground dir*/
//FUNCTION
//Promise function
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //if any of the argument passed is a negative number, we reject the operation and return
      if (a < 0 || b < 0) {
        return reject("Numbers must be non-negative!");
      }
      resolve(a + b);
    }, 2000);
  });
};

//TEST
//Testing async function with promises
test("Should add two numbers", done => {
  add(2, 3).then(sum => {
    expect(sum).toBe(5);
    done();
  });
});

/*We can create test for the same add function using AsyncAwait and this is the most popular way of testing Async code because its syntax is easier to work with*/

//Testing the add function with AsyncAwait
test("Should add two numbers async/await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
