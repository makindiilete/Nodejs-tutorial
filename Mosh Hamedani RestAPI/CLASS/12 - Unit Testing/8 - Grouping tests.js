/*Currently we have 3 tests for our "absolute test" but as we write more tests, it becomes important to group and organise this tests so they can be clean and maintainable.

TESTS ARE 1ST CLASS CITIZENS IN YOUR SOURCE CODE. THEY ARE AS IMPORTANT AS THE PRODUCTION CODE. IT IS BETTER NOT TO WRITE TEST THAN TO WRITE TESTS THAT ARE UGLY AND NOT MAINTAINABLE
*/

//GROUPING RELATED TESTS INSIDE DESCRIBE BLOCK
//loading the function we want to test
const lib = require("../lib");

//"describe" is used for grouping tests. d 1st arg = the name of the function we are testing and 2nd arg is a function containing all the tests we are performing
describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
