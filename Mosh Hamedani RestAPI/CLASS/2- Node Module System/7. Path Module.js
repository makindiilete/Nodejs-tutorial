/*we have some modules which are built in to the core of node, with this modules, we can work with files, operating system, network etc*/

/*Built-in modules can be access from https://nodejs.org/dist/latest-v10.x/docs/api/ but not all of them are modules e.g. console*/

/*LIST OF MODULES TO BE AWARE OF AND THEIR USES
 * File System : - To work with files
 * HTTP : - Used to create web servers that listens to http request
 * OS : - To work with the Operating system
 * PATH : - This gives us a bunch of utility functions for working with paths
 * PROCESS : - Gives us info about the current process
 * QUERY STRINGS : - Very useful in building http services.
 * STREAM : - Allows us to work with streams of data.
 *
 * We will be looking at the Path module.
 *
 * Click on the PATH Module and you will see a list of methods that can be used, we will be using the "path.parse(path)" method*/

//USING THE PATH MODULE : - The path module simply gives us information about the file path.
/*If you scroll down, you will see how to use this module : -

* The path module provides utilities for working with file and directory paths. It can be accessed using:

const path = require('path');*/

//EXAMPLE
// here we can see that we didnt define the path in the require(), we simply use "require("path)" instead of the "require("./pathname") we have been using. We node sees this, it will use the "built-in path

const path = require("path");

//passing the "__filename" as the parameter (one of the wrapper function)
var pathObj = path.parse(__filename);

console.log(pathObj);

//RESULTS : - Here we have full info about the path to the current file
{ root: 'C:\\',
    dir:
    'C:\\Users\\Michaelzgraphix\\Desktop\\web dev\\Nodejs\\first-app',
        base: 'app.js',
    ext: '.js',
    name: 'app' }


