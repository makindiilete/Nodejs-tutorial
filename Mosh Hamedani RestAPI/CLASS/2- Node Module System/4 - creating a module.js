Let us add a new module to this app. This module will be used to log messages. This is very simple to do, just create a new file with the name "logger.js".
This module will be re-usable in different or all parts of the application.

In the logger module, lets create a url endpoint and a function to send an http request :
//sending an http request to the endpoint 'url'
var url = 'http://mylogger.io/log'

function log(message) {
//    Send an HTTP request
    console.log(message)
}

/*The variable 'url' and the function 'log' are scope to this module, they are not visible outside but we can make the logger module accessible from the main module 'app.js'

To export the module, we need to export individually the variables and functions we need to use in the main module and the syntax to do this is seen below*/

module.exports.log = log;
module.exports.url = url;

//This can be re-written so we change the name we will use to access it in the main module

module.exports.loggerFunction = log;
module.exports.endPoint = url;

//SO NOW WE HAVE

var url = 'http://mylogger.io/log'

function log(message) {
    console.log(message)
}
module.exports.loggerFunction = log;
module.exports.endPoint = url;

//BUT IN THIS CASE, WE DON'T NEED TO EXPORT THE url variable to the outside because other modules doesnt need to know about this....The only thing other modules needs to call is the function we defined in the logger module so our code will be refactored to this :

var url = 'http://mylogger.io/log'

function log(message) {
    console.log(message)
}
module.exports.loggerFunction = log;


//So now our log function is public and our endpoint 'url' remains private because endpoints can be different across different modules....So this way we can have different endpoints across multiple modules but they will all send http request to this endpoints using the same function we defined in the logger module.
