/*Now that we have learnt how we can commit our files to local repo, we can send them to remote repo on github to host it and heroku will also have access to deploy the latest version of our app.

SSH KEYS : - SSH - Secure Shell, this allows us to transfer our code from our machine to other 3rd party servers in a secure way. A secure way of communicating with another machine using SSH Key pair which is 2 files ".rsa & .rsa.pub"

SETTING UP SSH KEYS
1-  For Windows user, you must use Git BASH
2-  Check if you already have SSH Key exisiting from any project by running the code "ls -a -l ~/.ssh". -a list all hidden files, -l sort them vertically instead of columns, ~/.ssh find the files with ssh key. If you have ssh keys, you will see results containing two files "id_rsa.pub" & "id_rsa" and you can use them with no need to create a new one.
3-  If you have no ssh keys before now, the code will fail so you need to create ssh key
4- Run the code [ssh-keygen -t rsa -b 4096 -C "akindiileteforex@gmail.com"]
5-  Click Enter to give default answer to the wizard questions
6-  Now we run the code to check for ssh keys again to confirm we have them now "ls -a -l ~/.ssh". This should now show "rsa" & "rsa.pub". The first one will be kept secretly on your pc and should not be shared, the second one with "pub" is for public which we will share with heroku and git so we can secure the communication between our machine and their servers
7-  Next is to setup the ssh keys to be used the next time we setup ssh connection
8-  Run "eval $(ssh-agent -s)". This starts up the ssh agent
9-  Run "ssh-add ~/.ssh/id_rsa" to add the ssh key*/
