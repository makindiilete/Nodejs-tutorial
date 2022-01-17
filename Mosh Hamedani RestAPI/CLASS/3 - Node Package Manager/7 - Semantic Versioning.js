/*A node package version comes in the 3 : -
 * "mongoose": "^4.13.6" - Where 4 is the Major release, 13 is the Minor release, 6 is the Patch release which is used for bug fixes.
 *
 * So if the developer of mongoose discovers a bug in the current version, he released a new version "mongoose": "^4.13.7".
 *
 * The Minor version is used for adding new features that dont break the existing api. So if the developer adds a new feature that doesnt break the existing api, the version will be released as "mongoose": "^4.14.0", The patch is 0 because no bug has been detected yet.
 *
 * The major version is used for adding new features that breaks the existing api. So the next major version will be "mongoose": "^5.0.0"*/

//MEANING OF THE ^ CHARACTER

/*The ^ character in the "mongoose": "^4.13.6"
 * This tells node that we are interested in any mongoose version as long as its major release is 4. So if after 6 months time, this app is downloaded and re-installed, the latest released of 4 will be installed for example : "mongoose": "^4.16.9". The ^ can also be replaced with "4.x"
 *
 * Another character is "~" e.g. "underscore": "~1.8.3" : - This is called "Tilde" which means we are interested in any version as long as its major and minor version is "1.8.x", so if there is a new patch available, we will be interested in that patch also....*/

//In conclusion, if you want to ensure there is no break in changes from the package minor and patch updates in future if another person want to use the code, YOU SIMPLY REMOVE THE ^ (caret) and ~ (tilde) character...This way, when another user uses "npm install" even in 6years time, the exact version used will be the one to be installed
