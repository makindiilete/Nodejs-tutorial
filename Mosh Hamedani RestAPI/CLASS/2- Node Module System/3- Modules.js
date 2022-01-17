/*
Just like in angular, every files (e.g. app.js) in a node app contains modules. In angular we can have different modules like "shopping.modules.ts" while "app.module.ts" is the parent module. Same in node apps, each files contains a module with the "app.js" being the parent module. This way we can use the same variable name or declare function with the same name in different files/modules and they will not overwrite each other unlike javascript where we cannot use same variable for same module because all variables in js are part of the window object.
Because variables are not part of global objects in node but each variable is peculiar to its module, we can declare different function with same name.

IN NODE, EVERY FILE IS A MODULE AND THE VARIABLES AND FUNCTION DECLARED IN THAT FILE ARE A LOCAL SCOPE TO THAT MODULE. THEY ARE PRIVATE (In object oriented programming terms) AND CANNOT BE ACCESSIBLE OUTSIDE THEIR MODULES UNLESS WE EXPORT THEM JUST AS WE USE TO DO IN ANGULAR.
*/
