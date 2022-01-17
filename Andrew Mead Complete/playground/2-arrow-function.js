/*
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
*/

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
