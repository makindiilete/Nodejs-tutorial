//Setting a default params for "name"
const greeter = (name = "user", age) => {
  console.log("Hello " + name);
};
//calling function with argument
greeter("Michael");
//calling function without argument
greeter();

//obj destructuring
const product = {
  label: "Red Notebook",
  price: 3,
  stock: 201,
  salePrice: undefined
};

//Working with obj destructuring and passing no param
const transaction = (type, { label, stock = 0 } = {}) => {
  console.log(type, label, stock);
};
//Calling the transaction function without the product{} as arg
transaction("order", product);
