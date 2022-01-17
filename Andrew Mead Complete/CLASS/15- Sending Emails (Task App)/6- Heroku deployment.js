/*We will rounding up the section by getting our task manager deployed to prod on heroku so it can connect to our production database we created in the last lesson.

The only file we will be working with is "dev.env"
1-  Move out or delete the playground folder from the task-manager dir

//INITIALISING GIT
1-  Run "git init"
2-  Run "git status" to check folders to be added
3-  Create a ".gitignore" file and add node_modules & config folder
4-  Run "git add ."
5-  Run "git commit -m "Init Commit"
6-  Go to github website and create a new repository "michaelz-task-manager-api" >>> Choose "Private" >>> Push the code to git
7-  Refresh the browser to see your changes

//HEROKU SETUP
1-  Run heroku create michaelz-task-manager (Always prefix with ur name or client name)

//NOW WE NEED TO SET OUR HEROKU PRODUCTION ENVIRONMENT VARIABLES FROM THE TERMINAL
//Syntax to set a prod env var
heroku config:set key=value (TO SET ENVIRONMENT VARIABLES)

//Syntax to read all set prod env var
heroku config

//To remove prod env var
heroku config:unset key

2-  heroku config:set JWT_SECRET=makindiilete123999ABCabc SENDGRID_API_KEY=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 (The keys must match the key used in the dev env var)

//SETTING THE "MONGO_URL" PROD ENV VAR
3-  Go back to the browser >>> Click on "Clusters" >>> Click on "Connect" >>> Click on "Connect Your Application" >>> Copy the connection string and replace <password> with your password (mongodb+srv://michaelztaskapp:123999abc@cluster0-4sjnt.mongodb.net/test?retryWrites=true&w=majority) and also replace "test" with the name you want to use for your database
4-  Run : -  heroku config:set MONGODB_URL="mongodb+srv://michaelztaskapp:123999abc@cluster0-4sjnt.mongodb.net/task-manager-api?retryWrites=true&w=majority"
5-  Run "heroku config" to verify your 3 env variables.

//  PUSHING OUR CODE TO HEROKU SERVER
6-  Run "git push heroku master"
7-  Now the process should complete and you should have your url = https://michaelz-task-manager.herokuapp.com/

//SETTING UP THE HEROKU PROD URL FOR OUR PRODUCTION ENV IN POSTMAN
8-  Open Postman and manage env variables
9-  Edit the production : Variable = url, Initial value(used when collaborating with team mates) = empty, current value = https://michaelz-task-manager.herokuapp.com
10- Switch the env to prod in POSTMAN and test the routes, they should all work correctly now.
11- Open mongodb compass to check the database and the new database should have been created with the newly added user.
12- Now we can also run our tasks route and all should work.

We are not done with our task manager app yet, in the next section, we will learn how to writ automated test to test our code
*/
