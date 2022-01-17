/*We already learnt how to replace a real function with a cloned/mock function but in this lecture we will see the downside of the previous technique and a better way of creating mock functions*/

//FUNCTION FROM EXTERNAL RESOURCE TO BE MOCKED
const db = require("./db");
const mail = require("./mail");
// Mock functions
module.exports.notifyCustomer = function(order) {
  const customer = db.getCustomerSync(order.customerId);

  mail.send(customer.email, "Your order was placed successfully.");
};

//Mail.js

module.exports.send = function(to, subject) {
  console.log("Sending an email...");
};

//Test

//Ideal mock functions with interactions
//loading the external resource to be cloned
const db = require("../db");
//loading the external mail module
const mail = require("../mail");

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    //Cloning "db.getCustomerSync"
    db.getCustomerSync = function(customerId) {
      return { email: "a" };
    };

    let mailSent = false;
    //cloning "mail.send"
    mail.send = function(email, message) {
      mailSent = true;
    };
    lib.notifyCustomer({ customerId: 1 });
    expect(mailSent).toBe(true);
  });
});
