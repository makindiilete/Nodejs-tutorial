/*We will explore advanced postman fixtures which will make using the app easier as we see that our number of requests continue to grow.

This will make it easier to test the requests that our APIs supports.

we will talk about POSTMAN ENVIRONMENT & POSTMAN ENVIRONMENT VARIABLES
POSTMAN ENVIRONMENT : - Currently we have up to a dozen of request with all of them calling our localhost server, this is good but when we deploy the app to production, we will then need to use heroku url and this will require us to start to manually edit all our request url one after the other. This will really be a mess because when we want to test with the localhost again, we need to edit all again, in this case, we can setup an environment with various variables which we can be used to configure how postman runs.

We will do this for our urls and our auth tokens

1-  Click on the gear icon on the top right > Select "Manage Environment"
2-  Click on "Add" to add the first one
3-  Name = "Task Manager API [dev]" - For development mode
4-  Now you can set various key value pairs : - Let us create one for the url
    KEY = url
    VALUE = localhost:3000
5-  Click "Add" to add the new environment and then you can add another
6-  Click on "Add" to add a new environment
    KEY = url
    VALUE = blank
    They are blank because we do not know what their value will be yet.
7-  Close the tab, select one of your environment from the Environment tab

//USING THE ENVIRONMENT VALUE
Now we need to edit our urls to use the new environment variable we have set up.
1-  Change the environment to dev
2-  Change the url from "localhost:3000/users" TO "{{url}}/users . {{url}} takes the value we set in the environment and hovering over it reveals the value to us."
    To use the Production mode, you only need to change the environment, once you have the value for the production url from heroku, you set it as the value and everything will work just fine
3-  Now you can send the request and it will work well.
4-  Edit all your url to use the variable.
*/

/*SETTING OUR AUTHENTICATION HEADERS EASIER FOR ONLY ONE REQUEST
 * 1-  Click on the "READ PROFILE" request
 * 2-  Delete the header we set
 * 3-  Click on the Authorization tab
 * 4-   Select "Bearer Token" as type
 * 5-   In the token field, paste your token
 * 6-   Save it and click to send the request.*/

/*SETTING OUR AUTHENTICATION HEADERS FOR ALL REQUEST IN THE COLLECTION
 * 1-  Click on the ... next to a collection
 * 2-  Click on EDIT
 * 3-  Click on the Authorization tab
 * 4-   Select "Bearer Token" as type
 * 5-   In the token field, paste your token
 * 6-   Save it and click to send the request.*/

/*Now for our CREATE USER & LOGIN USER request, we click on Authorization tab and set the type to "No Auth" since we do not need Authorization for them and save.
 *
 * All the rest request we have their Auth set to "Inherit From Parent"*/

/*
MANUAL WAY OF ACCESSING OUR AUTHENTICATED ROUTES: -
1-  Create a new user or login > Get the token
2-  Go back to the "Edit collection" > "Authorization" > "Update the stored token"
3-  Then we will be able to make a request using the logged in user to other request routes

AUTOMATIC WAY
We can write few lines of js code in our postman app to automate this tasks for us so that whenever we logged in or signup, the auth token will be updated for the collection.

Inside POSTMAN, the tabs contain :
PRE-REQUEST SCRIPT : - This are script that can run before a request is sent
TEST : - This script is run after the response is received and there we will write our code to extract th token property on the body and set an environment variable whose value is equal to that token. From there we will use that environment variable inside of the collection to get everything working as expected.
1-  Click "Edit Collection" > "Authorization"
2-  Remove the token we stored and replace with with {{authToken}}
3-  Now back to the LOGIN request > Click on TEST and write the code below


*/

// if our request completed with a status code of 200 i.e. success
if (pm.response.code === 200) {
  // we set our environment variable : 2 args : the name to use to store the token, the token to set which we grab from pm.response.json().token. Where .token is one of the properties returned
  pm.environment.set("authToken", pm.response.json().token);
}

//Now with this, all we need to do to get a valid token to use is login and then we get a new token which is instantly added to the environment variable and then we can go ahead and make our auth request

/*Now we copy our code from the LOGIN request and paste it inside the Test tab of create user.

// if our request completed with a status code of 201 i.e. created
if (pm.response.code === 201) {
    // we set our environment variable : 2 args : the name to use to store the token, the token to set which we grab from pm.response.json().token. Where .token is one of the properties returned
    pm.environment.set("authToken", pm.response.json().token)
}

So now we do not need to copy token around or change url.
Now if we click the "Task Manager [dev]", we see our auth token. This doesnt contain any initial value because we always want to be using the current value.*/
