/*Create a new project for this section "async-demo" and in the folder, create a new file "app.js"*/

//SYNC/BLOCKING : - This is like a restaurant where the wait gets your order, send it to the chef and waits there until your meal is ready it then brings it to you and then go to the next client to take his order.

// This is a simple example of sync/blocking program : - When the first line is executes, the program is blocking and the 2nd line has to wait until the first line finishes execution.
console.log("Before");
console.log("After");

//ASYNC PROGRAM : - This is in contrast to sync restaurant, the waiter takes your order, sends it to the chef and while the chef is preparing your meal, the waiter moves on to th next table  to take their order.
//Example of Async
console.log("Before");
setTimeout(() => {
  console.log("Reading a user from a database.....");
}, 2000);
console.log("After");

/*If you run this async program, you might expect that the first line with get executed first then we wait for the 2seconds timeout and then the 2nd line gets executed and then the 3rd line comes last because this is how it is arranged. BUt this is not the case, if you run this program, the first & 3rd line messages "Before & After" get executed immediately and then after 2seconds, the timeout function on the 2nd line gets executed. This is an example of async/ non-blocking function.

The program gets to the first line and execute the code, it then gets to the 2nd line and discover there is a 2seconds wait, it then schedule this 2nd line and pass the control to the 3rd line and after executing the 3rd line, its now free to execute the scheduled timeout function.
*/

/*
IN NODEJS, WHENEVER YOU ARE DEALING WITH OPERATION THAT INVOLVES DISK OR PROGRAM THAT INVOLVES NETWORK ACCESS, YOU ARE DEALING WITH ASYNC CODE so you need to understand how async code behaves and more importantly you need to know how to write async code in a clean and maintainable way.*/
