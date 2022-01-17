/*So far everytime we make a change to our test code or production code, we always go back to the terminal to re-run our test. This is tedious, let us see how to make "jest" watch all our files so anytime we make a change in our test code or production code, jest will automatically re-run our test.

1) Go to package.json and in the script{} change it to
  "scripts": {
    "jest": "jest --env=node --colors --coverage test --watchAll",
    "test": "npm run jest"
  },

  Now jest will automatically re-run the test anytime we change and save

  In real world usage, you want to have your test console and your editor side by side or you use different monitor/screen for each
*/
