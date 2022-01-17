/*You can update a published package e.g. we can add a new export to our lion-lib*/

module.exports.add = function(a, b) {
  return a + b;
};
module.exports.multiply = function(a, b) {
  return a * b;
};

//PUBLISHING
/*We need to first update the version number to update as we cannot update with the same previous version. So we change the version number depending on the changes and features which in this case its just a new feature that doesnt break changes in the api because our api "module.exports.add" is kept exactly as before and so any app depending on the add function will continue to work, we just added a new feature.
 *
 * 1) "npm version minor" (this can be major, minor or patch depending on what you are updating. This will automatically update the minor number.
 * Our version number has been updated to "1.1.0"
 * 2) "npm publish"*/
