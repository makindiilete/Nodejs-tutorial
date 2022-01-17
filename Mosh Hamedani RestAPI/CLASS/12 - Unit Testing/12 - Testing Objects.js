// Testing objects
module.exports.getProduct = function(productId) {
  return { id: productId, price: 10 };
};

//Testing for Objects
describe("getProducts", () => {
  it("should return the product with the given Id", () => {
    //module.exports.getProduct = function(productId) {
    const result = lib.getProduct(1);
    //return { id: productId, price: 10 };
    //"toEqual" will fail if any other properties comes into d object apart from the ones defined here...."TOO SPECIFIC"
    expect(result).toEqual({ id: 1, price: 10 });
    //"toMatchObject", even if the object properties grows to include 50 other ones, as long as we have this 2 properties in the object, the test will continue to pass....."IDEAL WAY"
    expect(result).toMatchObject({ id: 1, price: 10 });
    //here we are testing that we have a property of "id" in the object and its value is 1....This 1 must be a Number..."IDEAL WAY"
    expect(result).toHaveProperty("id", 1);
  });
});
