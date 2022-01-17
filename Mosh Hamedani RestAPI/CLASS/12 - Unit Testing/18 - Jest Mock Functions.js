/*We learnt how to create mock functions and test the interaction of one object with the other.  We will use a better approach to achieve the same thing.*/

//in jest we av a method for creating mock function
/*const mockFunction = jest.fn();
//mockFunction.mockReturnValue(1);
//mockFunction.mockResolvedValue(1);
mockFunction.mockRejectedValue(new Error('.....));
const result = await mockFunction();*/

/*SO WE CAN MODIFY OUR FORMER CODE FROM: - */
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

//TO
//Cleaner mock function with jest.
describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
  });
});

/*Sometimes you also want to check the arguments that are passed to that method, so we use another matcher*/
//Ideal mock functions with interactions
describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
    //checking the first argument
    expect(mail.send.mock.calls[0][0]).toBe("a");
    //checking the first argument
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
