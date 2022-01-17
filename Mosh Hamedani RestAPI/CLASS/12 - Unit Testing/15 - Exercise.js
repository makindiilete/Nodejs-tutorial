/*Open up exercise1.js and write a unit test for this code*/
module.exports.fizzBuzz = function(input) {
  if (typeof input !== "number") throw new Error("Input should be a number.");
  //if value can be divided by 3 or 5 return "FizzBuzz"
  if (input % 3 === 0 && input % 5 === 0) return "FizzBuzz";
  //if value can only be divided by 3 return "Fizz"
  if (input % 3 === 0) return "Fizz";
  //if value can only be divided by 5 return "Buzz"
  if (input % 5 === 0) return "Buzz";
  //if value can neither be divided by 3 or 5, return d input
  return input;
};

//SOLUTION
const lib = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw an exception if input is not a number", () => {
    //  TESTING FOR POSSIBLE SCENARIOS OF NaN
    expect(() => {
      lib.fizzBuzz("a").toThrow();
    });
    expect(() => {
      lib.fizzBuzz(null).toThrow();
    });
    expect(() => {
      lib.fizzBuzz(undefined).toThrow();
    });
    expect(() => {
      lib.fizzBuzz({}).toThrow();
    });
  });
  //TESTING FOR VALUE DIVISIBLE BY 3 & 5
  it("should return FizzBuzz if input is divisible by 3 and 5", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  //TESTING FOR VALUE DIVISIBLE BY ONLY 3
  it("should return Fizz if input is only divisible by 3", () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe("Fizz");
  });
  //TESTING FOR VALUE DIVISIBLE BY ONLY 5
  it("should return Fizz if input is only divisible by 5", () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe("Buzz");
  });
  //TESTING FOR VALUE NOT DIVISIBLE BY EITHER 3 OR 5
  it("should return input if input is not divisible by 3 or 5", () => {
    const result = lib.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
