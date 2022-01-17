// Testing exceptions
module.exports.registerUser = function(username) {
  if (!username) throw new Error("Username is required.");

  return { id: new Date().getTime(), username: username };
};

//Testing for exceptions
describe("registerUser", () => {
  //Null
  //  Undefined
  //  NaN
  //  ""
  //  0
  //  false : All this values are not acceptable as username so they are falsy

  /*LONGER VERSION*/
  it("should throw an error is username is falsy", () => {
    //test for null
    expect(() => {
      lib.registerUser(null);
    }).toThrow();
    //test for undefined
    expect(() => {
      lib.registerUser();
    }).toThrow();
    //test for NaN
    expect(() => {
      lib.registerUser(NaN);
    }).toThrow();
    //test for ""
    expect(() => {
      lib.registerUser("");
    }).toThrow();
    //test for 0
    expect(() => {
      lib.registerUser(0);
    }).toThrow();
    //test for false
    expect(() => {
      lib.registerUser(false);
    }).toThrow();
  });
});

/*SHORTER VERSION*/
describe("registerUser", () => {
  it("should throw if user is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach(a => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  //Truthy Test
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Mosh");
    //testing for the valid username
    expect(result).toMatchObject({ username: "Mosh" });
    //testing for the id differently since we cant test for the "id: new Date().getTime()" bcos the time we always be different but in any case we know that the time and date is always greater than 0
    expect(result.id).toBeGreaterThan(0);
  });
});
