/*We will be learning how to create async non-blocking application which means our app will be able to continue to do some other things while waiting for some long running I/O process to complete and it is one of the things that makes nodejs so great.*/

//SYNC PROGRAM EXAMPLE : - In sync program, the program runs line by line, one line after the other like below
console.log("Starting");

console.log("Stopping");

//ASYNC PROGRAM EXAMPLE : -
console.log("Starting");
//setTimeout function taking two args : - callbackfn & the number of milliseconds to wait before running the callbackfn
setTimeout(() => {
  console.log("2 seconds timer");
}, 2000);
console.log("Stopping");

/*Running the program : -
Starting
Stopping
2 seconds timer

This is a simple example but in a real world scenario, we might be fetching a user details from a database and it will be cool for us to be able to do some other stuffs while waiting for the information to be fetched from the database
*/

//Example 2 : -
console.log("Starting");
//setTimeout function taking two args : - callbackfn & the number of milliseconds to wait before running the callbackfn
setTimeout(() => {
  console.log("2 seconds timer");
}, 2000);
//zero second timer
setTimeout(() => {
  console.log("Zero second timer");
}, 0);
console.log("Stopping");

/*We might expect the zero second timer to get called before the "stopping" message but when we run the program, this was not the case. What we actually get is below : -

Starting
Stopping
Zero second timer
2 seconds timer

Why does this happened? We will get how node works with async programming behind the scene
*/
