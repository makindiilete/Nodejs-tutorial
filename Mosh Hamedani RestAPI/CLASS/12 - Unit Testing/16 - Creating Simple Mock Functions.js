/*So far we have been working with functions that does not have external dependencies but now we will be working with function having external dependency on a database object imported from a module './db".

We already talked about the fact that during we should not talk to an external resources in our unit test and this external resource can be just another module in the same application, database etc. but we will learn how to talk to external resources in our unit test.

So to unit this function having an external dependency on an external module, we replace the method calling the external resource with a fake/mock function.
*/

//THE REAL FUNCTION INSIDE EXTERNAL RESOURCE WHICH WE WILL CLONE

//db.js file
module.exports.getCustomerSync = function(id) {
  console.log("Reading a customer from MongoDB...");
  return { id: id, points: 11 };
};

module.exports.getCustomer = async function(id) {
  return new Promise((resolve, reject) => {
    console.log("Reading a customer from MongoDB...");
    resolve({ id: id, points: 11 });
  });
};

//THE REAL FUNCTION THAT CALLS THE EXTERNAL RESOURCE WHICH WE WANT TO UNIT TEST
// Mock functions
module.exports.applyDiscount = function(order) {
  const customer = db.getCustomerSync(order.customerId);

  if (customer.points > 10) order.totalPrice *= 0.9;
};

//THE UNIT TEST FOR MOCK FUNCTION
//loading the external resource to be cloned
const db = require("../db");

//Testing for mock functions
describe("applyDiscount", () => {
  //Cloning the function in the external resource (Mock Function)
  db.getCustomerSync = function(customerId) {
    console.log("Fake reading customer....");
    return { id: customerId, points: 20 };
  };
  it("should apply 10% discount if customer has more than 10 points", () => {
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

/*Our test get passed and we get the message "Fake reading customer"*/
