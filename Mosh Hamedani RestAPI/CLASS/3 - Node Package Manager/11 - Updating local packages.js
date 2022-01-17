/*As you build your app, some of your packages may get outdated. You can find out what packages have been outdated and what are the new versions.*/

//FINDING OUTDATED PACKAGES : - npm outdated
/*This list 5 columns : Package, Current, Wanted, Latest, Location
 * Package : - The package name
 * Current : - The installed version
 * Wanted : - Following the ^ character, this is the latest version of the major release on your pc
 * Latest : - This is the latest released
 *
 * To updated them, you run "npm update", this will only update the minor and patch releases. This will not update to the major release in other to avoid break in changes.
 *
 * To update your packages to their latest release including the major versions, you run "npm i -g npm-check-updates"
 * then you run "npm-check-updates"
 * and finally you run "ncu -u" to upgrade.  (ncu - npm-check-updates)
 * Bear in mind this may cause break in changes
 * This packages will not be installed just yet so finally you need to run
 * "npm install" to complete the upgrade.*/
