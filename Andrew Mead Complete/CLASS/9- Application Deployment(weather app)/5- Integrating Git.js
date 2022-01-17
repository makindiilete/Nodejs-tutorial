/*This lesson will deals about how to integrate git into our project.
1-  "git init" : - to create a git local repository folder
2-  "git status" : - this shows the status of our project showing, tracked, untracked, modified files etc.

// IGNORING FILES
There are some folders, files that should not be pushed to our git repo e.g. node_modules, class, .idea etc. We can exclude them by
a-  Create a new file and name it ".gitignore"
b-  To exclude the folder, in the file, type the folder name and end it with slash e.g. node_modules/
c-  Confirm that the folder is not getting tracked with "git status"

3-  "git add" : - Use this to add directories & files. To add a directory, run "git add directory name/" e.g. "git add public/"
4-  "git add ." : - This add all untracked files
5-  "git commit -m "message : - This commit our files to the local repo with a message describing what changed e.g. "Adding support for image upload"
NOTE : - Always use "git status" to check for the project status after running every code.
NOTE : - 6 files change, 400 insertions (+) : This means 6 files were added and the total lines of code in those files are 400.
        1 files change, 2 deletions (-) : This means 1 file were added and inside the file you remove 2 lines of code.
*/

/*VS CODE GIT COLORS
1-  Green Color : - Untracked files
2-  Orange Color : - Unstaged changes
3-  Grey color : - Ignored files
4-  White color : - Tracked files*/
