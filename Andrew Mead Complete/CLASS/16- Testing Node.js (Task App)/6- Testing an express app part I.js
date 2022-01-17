/*Goal : - How to write test cases that interacts with our express APIs. So our test cases will make requests to the various endpoint, then we can write assertions to make sure they work as expected.

To write a test case that Logs in successfully using our LOG IN route, we could expect we get a 200 status code back with an auth token in the response and we could also write a test case that make sure that when the credentials are invalid, we dont get logged in. We will learn how to do all that but before we can get to that, we need to remember that all our task manager code depends on the environment variables we have set in "dev.env" file and this env vars only get activated when we run the dev script (npm run dev), but now that our tests runs with (npm test), those env vars will not be loaded which is a problem.

So we need to ensure we supply a set of environment variable to jest when it runs so that our test cases can start up the task manager server and make request to it. To do this, all we need is to :-
1-  Create a separate environment : - Inside the config dir, create a new file "test.env" to setup up our environment variables for our tests.
2-  Now we copy all the env variables we have defined inside "dev.env" into "test.env" and we just append "-test" to the mongodb url

NOTE : - We might be wondering why we need to create a separate env var file for the test instead of just loading the "dev.env" file inside our tests file. The reason is that we do not want to connect to the same mongodb database we are using for development to also use for our tests because this will populate the db with alot of documents we wont be using in the longrun, they will just be created for testing purpose, so we want to create a separate database to run our test which is why we are changing our mongodb url when we are running our tests.
*/

/*
//test.env
PORT=3000
SENDGRID_API_KEY=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
MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api-test
JWT_SECRET=thisismynewcourse
*/

/*
3-  Now we open our package.json file and we modify the jest script to use the "test.env" environment variable : - "test": "env-cmd ./config/test.env jest --watch"
4-  Now we need to add a new object to the package.json file which will be used as our jest configuration.
"scripts": {
    "start": "node src/index.js",
    "dev": "env-cmd ./config/dev.env nodemon src/index.js",
    "test": "env-cmd ./config/test.env jest --watch"
  },
  //JEST CONFIGURATION
  "jest": {
    "testEnvironment": "node"
  },

To learn more about how we can further configure jest, we can go back to the docs >>> Configuring Jest >>> On the right hand side, you can see all the bunch of options available from which we have used one.*/
