// Here we will be using the OS Module that gives us full information about the current operating system
/*If you click on the 'OS' from the nodejs docs, it will list the available methods :
 * os.freemem() = this shows the free memory available on your machine
 * os.totalmem() = total memory on the machine
 * os.userInfo([options]) = info about current user
 * os.uptime() = uptime of the machine
 *
 * To use the OS module, if we scroll down on the docs page we see the syntax "const os = require('os');"*/

//EXAMPLE :
const os = require("os");

var osPlatform = os.platform();
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

// Template string
//ES5

/*console.log("Platform Name: " + osPlatform);
console.log("Total Memory: " + totalMemory);
console.log("Free Memory: " + freeMemory);*/

// Template string
//ES6 / ES2015 : ECMAScript 6

console.log(`Your Operating System is: ${osPlatform}`);
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

//RESULTS
Your Operating System is: win32
Total Memory: 4226142208
Free Memory: 1384824832

/*Interesting thing is before arrival of node, we cannot get this information about our os because js runs in the browser with the window object but with node, we can run js outside the browser or call it on the server and this gives us access to all this features we cannot use with browser e.g. File, Networks, Os etc*/
