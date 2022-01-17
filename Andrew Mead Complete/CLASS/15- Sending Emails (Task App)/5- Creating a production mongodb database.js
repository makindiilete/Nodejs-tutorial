/*We will start the process of deploying the task application to production. This will be broken up into two lessons. In this lesson, the goal is to get a production ready mongodb database and in the next lesson, we will set everything up on heroku to ge our application deployed and working with that new database.

Currently the local db we are using will not be able to work with heroku when we deploy for production, we will need to use a mongodb database hosting service. We have alot of mongodb hosting service but we will be using the official mongodb hosting solution called ATLAS.
1-  Visit https://www.mongodb.com/cloud/atlas
2-  Click "Start for free" and fill the reg form and submit
3-  Set the configuration settings for your cloud provider and region (selecting only the free tier regions) >>> click on "Create cluster"
4-  Minimize the floating box
5-  On the page you get the message "Your cluster is being created", Wait for the process to complete
6-  Now we have graphs showing our database operations, connections and size (currently empty for now because it is new).
7-  Click the connect button >>> Under "Whitelist your connection IP Address, click on "Add a different IP Address and add "0.0.0.0/0" to whitelist all IPs. >>> Click on "Add IP Address"
8-  Under "Create a MongoDB User >>> Provide a username and password (michaelztaskapp:123999abc)
9- Click on "Create User"
10- Click "Choose a connection method" >>> Choose "Connect from mongodb compass"
11- Download the app and install >>> Copy the connection string on the page (mongodb+srv://michaelztaskapp:<password>@cluster0-4sjnt.mongodb.net/test)
12- Open the compass app >>> Leave the default filled values for the input >>> In the Favourite field name, type "Localhost database" and click "SAVE FAVORITE"
13- NOW WE NEED TO ALSO CREATE A SECOND  MONGODB COMPASS CONNECTION FOR OUR PRODUCTION ENVIRONMENT

Hostname : - cluster0-4sjnt.mongodb.net
SRV Record : - Ticked
Authentication : - Username / Password
Username : - michaelztaskapp
Password : - 123999abc
Favorite Name : - Production Mongodb database

14- Click "SAVE FAVORITE" >> Click "CONNECT"
15- Now we should connect successfully but we have no database in the production yet
16- Close down ROBO 3T as we no longer need it

RETRIEVING YOUR FORGOTTEN MONGODB ATLAS PASSWORD
1-  Login to your mongodb atlas dashboard
2-  Under Security on the left, click on DATABASE ACCESS >> Click on EDIT
3- A new modal opens >>> Click Edit password and enter a new password.*/
