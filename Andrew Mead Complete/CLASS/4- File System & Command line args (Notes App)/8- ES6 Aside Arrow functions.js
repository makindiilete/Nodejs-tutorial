/*We will be taking a break from our note app to talk about a JS feature we will be using throughout the course which is "ES6 Arrow Function"*/

//WHEN A FUNCTION IS USED AS A PROPERTY OF AN OBJECT, WE CALL IT A "METHOD"

//Normal Function
const square1 = function(x) {
  return x * x;
};
console.log(square1(3));

//Arrow function
const square2 = x => {
  return x * x;
};
console.log(square2(3));

//Arrow function II (Use this only when the function immediately returns a value)
const square3 = x => x * x;
console.log(square3(3));

//All returns 9

/*HOW ARROW FUNCTIONS WORKS AS PROPERTY OF AN OBJECT*/

//Object function
const event = {
  name: "Birthday Party",
  //  here we have a function as property of an object and "this" here reference the "event object" so we can easily use "this" to ref any available property
  printGuestList: function() {
    console.log("Guest list for " + this.name);
  }
};

event.printGuestList(); //Returns "Guest list for Birthday Party

//Object Arrow FUnction
const event = {
  name: "Birthday Party",
  //  Swapping the real function for arrow function, "this" returns "undefined"
  printGuestList: () => {
    console.log("Guest list for " + this.name);
  }
};

event.printGuestList();
/*Running the program we get the output : - "Guest list for undefined"
This is because when we use arrow function as property of an object, "this" inside such arrow function does not bind/ref the object.

SO ARROW FUNCTIONS DOES NOT WORK WELL WHEN WE WANT TO ACCESS "this".
 So in this case, it is advisable to use a standard function.*/

/*Now that we cannot access "this" with arrow function, it does not mean we are stuck with only standard function. ES6 provides another shorthand syntax we can use in place of standard function and still have access to "this" binding.*/

//ES6 function shorthand alternative to standard function
const event = {
  name: "Birthday Party",
  //  ES6 function shorthand syntax that gives us access to "this" binding.
  //  All we do is remove the "function" keyword and the ":" in front of the method name
  printGuestList() {
    console.log("Guest list for " + this.name);
  }
};

event.printGuestList(); //Return : - Guest list for Birthday Party.

/*WHY DOES ARROW FUNCTION AVOID "this" BINDING? We can find out by working with more examples.*/

const event = {
  name: "Birthday Party",
  guestList: ["Andrew", "Jane", "Mike"],
  //  ES6 function shorthand syntax that gives us access to "this" binding.
  printGuestList() {
    console.log("Guest list for " + this.name);
    //  looping through and printing all names on the guest list
    this.guestList.forEach(function(guest) {
      //  here we are using forEach callbackfn to loop through all the names in the array and also use "this" to bind to the "name" property but "this" will return "undefined"
      console.log(guest + " is attending " + this.name);
    });
  }
};

event.printGuestList();

/*This returns : -
Guest list for Birthday Party
Andrew is attending undefined
Jane is attending undefined
Mike is attending undefined

We can see here that all is working way except the "this" binding we used inside the forEach callbackfn

This happens because the callbackfn is a function nested inside another function (printGuestList()) and because it is nested/hidden inside another parent function, the parent function covers it and block its view from referencing/accessing the property it needs which is the object that creates the two function (event object).

There are various workaround to this*/

//WORKAROUND 1
const event = {
  name: "Birthday Party",
  guestList: ["Andrew", "Jane", "Mike"],
  //  ES6 function shorthand syntax that gives us access to "this" binding.
  printGuestList() {
    //  Because this is a parent function block a callbackfn of the forEach(), "this" will be inaccessible by default and we can create a variable and assign its value to "this" to make "this" accessible in the child function
    const that = this;
    console.log("Guest list for " + this.name);
    //  looping through and printing all names on the guest list
    this.guestList.forEach(function(guest) {
      //  now here to make "this" accessible, we simple bind to "that' the variable created which is equals to "this" and then we can access the property we want.
      console.log(guest + " is attending " + that.name);
    });
  }
};

event.printGuestList();

/*Now running the program returns : -
Guest list for Birthday Party
Andrew is attending Birthday Party
Jane is attending Birthday Party
Mike is attending Birthday Party

This first workaround is not ideal and we can use arrow function to solve this problem in this case.*/

//WORKAROUND II WITH ARROW FUNCTION
const event = {
  name: "Birthday Party",
  guestList: ["Andrew", "Jane", "Mike"],
  //  ES6 function shorthand syntax that gives us access to "this" binding.
  printGuestList() {
    console.log("Guest list for " + this.name);
    //  Now using arrow function inside a function nested inside a parent function, we can bind to "this" value of the object
    this.guestList.forEach(guest => {
      console.log(guest + " is attending " + this.name);
    });
  }
};

event.printGuestList();

/*Running the app now :- 
Guest list for Birthday Party
Andrew is attending Birthday Party
Jane is attending Birthday Party
Mike is attending Birthday Party*/

/*3 KEY TAKE AWAYS FROM THE VIDEO : -
1-  We can use arrow function to write shorter function code by eleminating the "function" keyword

//Arrow function
const square2 = x => {
  return x * x;
};
console.log(square2(3));

2-  For functions that returns a value immediately, we can write shorter function on a single line

//Arrow function II (Use this only when the function immediately returns a value)
const square3 = x => x * x;
console.log(square3(3));

3-  When we want to use "this" binding inside a method (function as property of an object), we cannot use arrow function, we either use standard function or the alternative ES6 syntax.
We only use arrow function for "this" binding when we are binding "this" keyword from a child function that is nested inside another parent function. (Where parent blocks the view of the child)

So arrow functions are poor candidates for "methods" and good candidates for everything else.*/
