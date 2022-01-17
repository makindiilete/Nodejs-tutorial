/*The module system allows us take advantage of all the benefits node provides and on the node documentation, we have all the modules listed with "console" available globally, which means  we dont need to do anything special like importing it before we can use them while others requires us to load them in before they can be used in our script.
*
* The module we will be dealing with here is the "File System" module which allows to deal with the OS file system to be able to read, write, append file (add to the content) and confirm if a given file exist etc.
*
* On the File System page, we have a method called "fs.writeFile()" which allows us to create a new file in the OS. It has async and sync version. This takes two args : -  "The name of the file and the data.*/

//USING THE FS MODULE


//Loading the fs module
const fs = require('fs')

//Args : - (filename, file content)
fs.writeFileSync('notes.txt', 'This file was created by Node.js!')

/*Now if we check our directory, we have a new file "notes.txt" and we can change the content again running the same code but with a new file content

//Loading the fs module
const fs = require('fs')

//Args : - (filename, file content)
fs.writeFileSync('notes.txt', 'My name is Michaelz')
*/


/*CHALLENGE : - Append a message to notes.txt
* 1-    Use appendFileSync to append to the file
* 2-    Run the script
* 3-    Check your work by opening the file and viewing the appended text*/

//Loading the fs module
const fs = require('fs')

//Args:- (filename, content to be appended to the existing content)
fs.appendFileSync('notes.txt', ' I live in Nigeria.')
