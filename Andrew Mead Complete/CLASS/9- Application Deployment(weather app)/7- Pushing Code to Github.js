/*Now that we have our ssh keys in place, we are ready to start sharing our code with those 3rd party services. We will push our code to github servers in this lesson and next we will push it to heroku so our app can be deployed

1-  Login to your github account and create a new repository
 2- Setup a name, leave other options and click on "Create repository"
 3- You have 3 possible scenarios on the next page
    a-  ...or create a new repository on the command line
    git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/makindiilete/nodejs-weather-app.git
git push -u origin master
    b-  ...or push an existing repository from the command line
    git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/makindiilete/nodejs-weather-app.git
git push -u origin master
    c-  ...or import code from another repository
First option is if you do not have a local repository already setup inside the project folder (you do not have the hidden .git folder)
Second options is for you if you already have a local repo and just want to push to remote repo
Third option is to import code from another repo

//ADDING A REMOTE REPO
git remote add origin https://github.com/makindiilete/nodejs-weather-app.git : - This connect/add your local repo to this remote repo.

4-  Click on your profile picture on github page and click on "Settings"
5-  Click on SSH and GPG keys
6-  Enter a Title : "Work Laptop"
7-  In the terminal inside the project folder, run the code "cat ~/.ssh/id_rsa.pub"
8-  Copy the long strings result and paste it inside the key box
9-  Click Add SSH Key
10- It will save and it will display "Never used --Read/Write"
11- In Git bash, run the code "ssh -T git@github.com". This will test our ssh connection to the github server and if it works we will know our ssh connection works and we can push our commits
12- Type "yes"
13- You should now get the message "Hi makindiilete! You've successfully authenticated, but GitHub does not provide shell access." Which means you are good to go.
*/
