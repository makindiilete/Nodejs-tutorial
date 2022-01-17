/*If we try to send a get request to our genres api with "https://fast-scrubland-34502.herokuapp.com/api/genres", we get an error.
* We can check the reason behind this error using logs
1) In the terminal, run "heroku logs"
If you inspect the error you see that the reason is because we did not define a private key.

//INSPECTING THE LOGS FROM HEROKU WEBSITE
You can also view logs directly from heroku website
1) Login and click on your app name
2) Click on "More" > "View logs"
NOTE:- For some unknown reasons, we dont have the jwt error msg on heroku logs and that is why sometimes its preferable to use th terminal to view the logs.

MIND YOU THAT THE HEROKU LOG FILE IS DIFFERENT FROM THE WINSTON LOG FILE WE SETUP EARLIER.
*/

/*VIEWING WINSTON LOG FILE FROM HEROKU
1) On heroku website, login and click on your app name
2) Click on "More" > click on "Console"
3) Type in "bash" in the box and click "run"
4) A msg "Attempting to connect to dyno" will be displayed
5) After this msg has gone, type "ls"
6) All the files in your folder will be displayed
7) To view any of the files e.g. the "uncaughtExceptions.log", type "cat uncaughtExceptions.log"
8) You get bunch of error msgs from where you can find the error we had "jwtPrivateKey is not defined"
*/
