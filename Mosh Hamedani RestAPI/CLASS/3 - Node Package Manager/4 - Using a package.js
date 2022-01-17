/*We want to use the "underscore" package in our node app
 *
 * 1) Create a new file "index.js" in the root folder*/

//USING THE PACKAGE

var _ = require("underscore");

//require keyword will assume "underscore" is inside the node_modules folder because its not a file or path which we would have written as "./underscore"

//Here we want to use the package "underscore", we want to use one of the methods we can find the package website
var result = _.contains([1, 2, 3], 3);
console.log(result);

//RESULT : - true

/*About the method (this can be found on the docs page) : -
* contains_.contains(list, value, [fromIndex]) Aliases: include, includes
Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Use fromIndex to start your search at a given index.

_.contains([1, 2, 3], 3);
=> true*/
