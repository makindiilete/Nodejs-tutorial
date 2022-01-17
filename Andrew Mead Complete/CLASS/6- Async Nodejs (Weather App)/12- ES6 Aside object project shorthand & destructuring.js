/*We will be talking about a couple of ES6 fixtures that makes working with object easier when it comes to creating objects and accessing object properties and then we will use what we have learnt to improve our weather app.

We will start by creating a brand new file inside our playground dir "5-es6-objects.js"*/

//5-es6-objects.js
//Object property shorthand : - With this, we can add values to an object with a shorthand syntax under certain conditions. "Here we are not taking advantage of any new syntax"

const name = "Andrew";
const userAge = 27;

const user = {
  name: name,
  age: userAge,
  location: "Philadelphia"
};

console.log(user); //This returns : { name: 'Andrew', age: 27, location: 'Philadelphia' }

//ES6 SYNTAX : - This can be used when defining an object like we did above, it comes into play when we are setting an object property whose value comes from a variable of the same name i.e. the property name is the same string as the variable name where we are getting the value

//ES6 SHORTHAND

const name = "Andrew";
const userAge = 27;

const user = {
  //  since the variable in line 3 and the property name is the same, we simply write one of them instead of name: name
  name,
  age: userAge,
  location: "Philadelphia"
};

console.log(user); //This returns  : { name: 'Andrew', age: 27, location: 'Philadelphia' }

/*OBJECT DESTRUCTURING : - This is useful when you have an object and you are trying to access properties from it.

//The whole purpose of this concept is to extract object properties and their values into individual variables so instead of a product having a property "price" with a value of "3", we will have a "price" variable" with the value of "3". This is useful when working with complex object with alot of properties you are referencing, it nice to have those standalone variables extracted from an object which you can easily use*/

//obj destructuring
const product = {
  label: "Red Notebook",
  price: 3,
  stock: 201,
  salePrice: undefined
};

//Normal syntax
const label = product.label;
const stock = product.stock;

/*The problem with the normal syntax here is that we end up writing many codes for each property we want to convert to a variable, we can fix this with obj destructuring*/

/obj destructuring
const product = {
    label: "Red Notebook",
    price: 3,
    stock: 201,
    salePrice: undefined
};

// const label = product.label;
// const stock = product.stock;

//obk destructuring : - We extract all the properties we want to extract into variables.
const { label, stock } = product;
console.log(label);
console.log(stock);

/*Running the app : -
Red Notebook
201*/

/*When you are destructuring, you can list as many properties as possible including properties that do not exist in the object at all. Those properties that do not exist inside the object will have their value set to undefined*/

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
const { label, stock, rating } = product;
console.log(label);
console.log(stock);
console.log(rating);

/*Running the app : -
Red Notebook
201
undefined*/

/*SETTING DEFAULT VALUE : - Another feature is to be able to set a default value for a property in case the object does not contain the property like we did above and this default value will be returned instead of "undefined"*/

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
const { label: productLabel, stock, rating = 5 } = product;
console.log(productLabel);
console.log(stock);
console.log(rating);

/*
Red Notebook
201
5

Here we have set a default value for rating and because rating does not exist inside the object, this default value will be use but if we try to det a default value for stock which already exist in the object, the default value will not be used and it will be overridden by the value of the property in the object*/


/*CHANGING THE PROPERTY NAME : - We can also change the name of the properties to something else and still trying to get it from the same property*/

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
const { label: productLabel, stock, rating } = product;
console.log(productLabel);
console.log(stock);
console.log(rating);

/*
"C:\Program Files\nodejs\node.exe" "C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\playground\5-es6-objects.js"
{ name: 'Andrew', age: 27, location: 'Philadelphia' }
Red Notebook
201
undefined

Changing the name of the property can be handy especially when the name is already taken
*/

/*USING DESTRUCTURING IN FUNCTION ARGUMENTS : - */

const product = {
    label: "Red Notebook",
    price: 3,
    stock: 201,
    salePrice: undefined
};

const transaction = (type, myProduct) => {
    console.log(type);
    console.log(myProduct);
};

transaction("order", product);

/*Running the app : -
order
{ label: 'Red Notebook',
  price: 3,
  stock: 201,
  salePrice: undefined }

Here we see that we got access to all the properties inside the product object we passed as the value for our "myProduct" argument. We can use destructuring to select just few of the properties*/
//obj destructuring
const product = {
    label: "Red Notebook",
    price: 3,
    stock: 201,
    salePrice: undefined
};

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock);
};

transaction("order", product);

/*Running the app : - order Red Notebook 201*/