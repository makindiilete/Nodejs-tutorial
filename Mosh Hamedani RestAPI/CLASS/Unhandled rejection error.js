/*When you get this error : -

(node:30000) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)

This is simply telling you that you have a promise that was rejected but you didn't handle the error properly by using try catch block.

So all you need to do is implement a try catch in the code
*/
