/*So far, all the packages we have installed are application dependencies, our application needs this dependencies to run but sometimes we have dependencies that are only used during application development for example : -
 * Tools for running unit test
 * Tools for performing static analysis on our code
 * Tools for bundling our js code etc
 *
 * This dependencies are development dependencies because they are not needed for the app to run at production level and they should not go to prod env where we deploy our application.*/

//INSTALLING DEV DEPENDENCIES PACKAGES
/*npm install jshint --save-dev
 *
 * This will save the package under a new property "devDependencies"*/
