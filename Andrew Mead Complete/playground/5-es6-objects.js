//ES6 SHORTHAND
/*
const name = "Andrew";
const userAge = 27;

const user = {
  //  since the variable in line 3 and the property name is the same, we simply write one of them instead of name: name
  name,
  age: userAge,
  location: "Philadelphia"
};

console.log(user);*/

//obj destructuring
const product = {
  label: "Red Notebook",
  price: 3,
  stock: 201,
  salePrice: undefined
};

// const label = product.label;
// const stock = product.stock;

//obj destructuring : - We extract all the properties we want to extract into variables.
// const { label: productLabel, stock, rating = 5 } = product;
// console.log(productLabel);
// console.log(stock);
// console.log(rating);

const transaction = (type, { label, stock }) => {
  console.log(type, label, stock);
};

transaction("order", product);
