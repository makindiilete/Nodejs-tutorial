/*If you view the heroku log, you will see that our app crashed because it is trying to connect to our local database "'MongoNetworkError: failed to connect to server [localhost:27017] on first connect", this is our local server and it doesnt exist in the cloud so this is where the cloud server comes in. So we need to setup our cloud server and connect it to heroku
 */

/*Now that we have setup heroku account, we need to st up an mlab account. Mlab is used to deploy our mongodb database in the cloud.
 * 1) Head over to mlab.com, create a new account.
 * 2) Under 'Mongodb deployment', click on 'Create New'
 * 3) select any providers and a sandbox, click continue
 * 4) Select a region
 * 5) Type in a database name e.g. 'Vidly'
 * 6) Click submit order.
 * 7) Click on the database name
 * 8) Click on the 'Users' tab
 * 9) click on 'Add database user'
 * 10) type in username and password: - makindiilete:123999abc
 * 11) On top of the page you should have the link to connect to your database : 'mongodb://<dbuser>:<dbpassword>@ds239967.mlab.com:39967/nodejs_vidly'
 * 12) We will be using this later in our node backend
 * 13) Open the  "config" folder and open the "custom-environment-variables.json file" and paste the code*/

//custom-environment-variables.json (production environment)
{
    //this is our what we use to set our jwt secret key "vidly_jwtPrivateKey"
    "jwtPrivateKey": "vidly_jwtPrivateKey",
    //this will be use to set our database url from mongodb cloud "vidly_db"

    "db": "vidly_db"
}

//default.json (development environemnt)
{
    "jwtPrivateKey": "",
    "db": "mongodb://localhost/vidly"
}


/*
14) Now go back to the terminal and run "heroku config:set vidly_db=mongodb://makindiilete:123999abc@ds239967.mlab.com:39967/nodejs_vidly"

the long string was copied from mlab : "mongodb://<dbuser>:<dbpassword>@ds239967.mlab.com:39967/nodejs_vidly" and we replace the dbuser with our database username we set and same with dbpassword

15) In the terminal, run "git add ."
16) git commit -m "type message"
17) git push heroku master
18) Now if you check heroku log, you should see

2019-06-20T12:15:14.756141+00:00 heroku[web.1]: State changed from starting to up
2019-06-20T12:15:14.610438+00:00 app[web.1]: info: Connected to mongodb://makindiilete:123999abc@ds239967.mlab.com:39967/nodejs_vidly...

Our app is successfully connected to mlab and if we send get request again to "https://fast-scrubland-34502.herokuapp.com/api/genres" we wont get error msg but empty array because our database is currently empty.
*/


