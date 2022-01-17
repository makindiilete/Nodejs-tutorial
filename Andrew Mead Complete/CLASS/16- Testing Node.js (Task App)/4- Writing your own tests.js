/*In this lesson, you will be taking up the challenge of writing a couple of new test cases for a couple of new functions.*/

const fahrenheitToCelsius = temp => {
  return (temp - 32) / 1.8;
};

const celsiusToFahrenheit = temp => {
  return temp * 1.8 + 32;
};
/*CHALLENGE : - Test temperature conversion functions
 * 1-  Export both functions and load them into test suite
 * 2-  Create should convert 32 F to 0 C"
 * 3-  Create should convert 0 c to 32 F"
 * 4-  Run the Jest to test your work.*/

//MY SOLUTION
//math.js
//adding a default value for tipPercent incase u dont provide a value
const calculateTip = (total, tipPercent = 0.25) => total + total * tipPercent;

//fah to cel function
const fahrenheitToCelsius = temp => {
  return (temp - 32) / 1.8;
};

//cel to fah function
const celsiusToFahrenheit = temp => {
  return temp * 1.8 + 32;
};
module.exports = {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit
};

//math.test.js
//loading the math function from math.js file
const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit
} = require("../src/math");

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

//testing fah to cel function
test("Should convert 32 F to 0 C", () => {
  const temp = fahrenheitToCelsius(32);
  expect(temp).toBe(0);
});

//testing cel to fah function
test("Should convert 0 C to 32 F", () => {
  const temp = celsiusToFahrenheit(0);
  expect(temp).toBe(32);
});
