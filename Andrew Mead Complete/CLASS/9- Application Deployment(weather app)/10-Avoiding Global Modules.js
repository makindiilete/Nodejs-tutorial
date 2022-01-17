/*In this lesson, we will make our lives a little bit easier by setting up a second script in package.json.
 * We will create a development script which is going to run the nodemon command. If there is a command we use often in a project, it is best to create a script that runs it so it can be reusable.


  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js -e js,hbs"
  },

To run the script now, we run the code "npm run dev"

Now that we have this setup, this code works because we have nodemon installed as a global dependencies and other users in a team might not be able to run this script because they might not have it installed in their global modules and it is not in our local dependencies. So it is advisable to have all our modules installed locally.

So the solution is to uninstall nodemon globally "npm uninstall -g nodemon" and install it locally

Install it now with npm install nodemon --save-dev

Now that we have removed nodemon from global and installed it as local dev dependencies, we will not be able to run the code "nodemon src/app.js" anymore because it is not longer available as global but our "npm run dev" will still work running nodemon for us.
  */
