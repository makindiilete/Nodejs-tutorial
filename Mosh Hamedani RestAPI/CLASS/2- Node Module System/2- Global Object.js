// Global Objects : - This are part of the global scope that can be accessed anywhere in any files.
console.log();

//to call a function after a delay (basic javascript syntax)
setTimeout();
//to stop the timeout set
clearTimeout();

//We use this to repeatedly call a function after a given delay
setInterval();
//to stop the interval set
clearInterval();

/*Browser Javascript can access all this window objects (setTimeout, clearTimeout) via the window i.e.*/
window.console.log();
window.setTimeout();
window.setInterval();
/*but for faster code we dont include the "window" object but at runtime, javascript will add it and change it to what we have above by default.*/

/*
In Node, instead of the window, we have :
*/
global.console.log();
global.setTimeout();
global.setInterval();
/*
 and after we have written this in their short format excluding the global, at runtime, it will be added by default.
*/

/*JAVASCRIPT BROWSER ENGINE WINDOW OBJECT AND VARIABLES
In the client side javascript i.e. js in the browser, if we have the code :*/
var message = "Michaelz";
console.log(window.message);

/*This will give us "Michaelz" as the result, this is because the variable defined is part of the window object but this doesnt work in the server side javascript i.e. Node. Running this code:*/
var message = "Michaelz";
console.log(global.message);

/*This will return "undefined" because the variable is not available globally.*/
