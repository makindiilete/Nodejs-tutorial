//THE ARRAY FUNCTION WE WANT TO TEST
// Testing arrays
module.exports.getCurrencies = function() {
  return ["USD", "AUD", "EUR"];
};

/*VARIOUS TESTS SHOWING THE TOO GENERAL, TOO SPECIFIC & PROPER WAY*/
//Testing array
describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    //Too general
    expect(result).toBeDefined(); //this is too general bcos even if d wrong value is defined, the test will pass
    expect(result).not.toBeNull();

    //Too Specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    //  Proper Way
    expect(result).toContain("USD");
    expect(result).toContain("EUR");
    expect(result).toContain("AUD");

    //    Ideal way : This is the ideal way of working with the array bcos instead of checking for each currency one by one we simply compare the array with another array having the same elements in any order
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});
