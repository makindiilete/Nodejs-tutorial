/*One thing that goes hand in hand with environments is storing configuration setting for our app and overriding those settings depending on the environment.

For example in your development environment, you gonna use a different database on mail server so we will learn how to store configuration settings for your application and override them in each environment.

There are many node packages for managing configurations, the most popular one is "npmrc" but the recommended package is "npm config" .
1) npm install config@1.29.2
2) Create a folder "config"
3) In the config folder, add a new file "default.json" : This will contain the default configuration.
4) Add a new file "development.json" : this will contain the development env config.
5) Add a new file "production.json" : this will contain the production env config
*/

//default.json
{
    "name": "My Express App"
}

//development.json
{
    "name": "My Express App _ Development",
    "mail": {
    "host": "dev-mail-server"
}
}

//production.json
{
    "name": "My Express App _ Production",
    "mail": {
    "host": "prod-mail-server"
}
}


//APP.JS FILE
///////////////////////////////////////////////////////////////////////////
///// REQUIRED PACKAGES //////////////////////////////////////////////////

//loading the config folder
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger");
const authentication = require("./authentication");
const express = require("express");
const app = express();
///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
///////// RETRIEVING ENV DETAILS ///////////////////////////////////////////
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));

//////////////////////////////////////////////////////////////////////////
/////  MIDDLEWARE   /////////////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(authentication);
app.use(helmet());

//using morgan only in dev env
if (app.get("env") === "development") {
    app.use(morgan("dev"));
    console.log("Morgan enabled....");
}
//////////////////////////////////////////////////////////////////////////

////// DATABASE //////////////////////////
const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];
/////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//HTTP CRUD OPERATIONS
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res
            .status(404)
            .send("The Course you looking for does not exist on this database. ");
        return;
    }
    res.send(course);
});

app.post("/api/courses", (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        // then we exit
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res
            .status(404)
            .send("The Course you looking for does not exist on this database.");
        return;
    }
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    //Else update the course
    course.name = req.body.name;
    //Return the updated course to the client
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res
            .status(404)
            .send("The Course you looking for does not exist on this database. ");
        return;
    }
    const index = courses.indexOf(course);
    //go to the index and remove one object
    courses.splice(index, 1);
    //Return the deleted course
    res.send(course);
});
///////////////////////////////////////////////////////////////////////////////

////// VALIDATION HANDLER /////////////////////////////////////
function validateCourse(course) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };
    return Joi.validate(course, schema);
}
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
/////// PORT CONFIG
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
/////////////////////////////////////////////////////////////////////////////


/*With this, if you open the terminal and change the env to development "set NODE_ENV=development" and then run "nodemon app.js", you will get the result below : -

Application Name: My Express App - Development
Mail Server: dev-mail-server
Morgan enabled.....

And if you change the env to production "set NODE_ENV=production" and run "nodemon app.js", you will get the result below : -

Application Name: My Express App - Production
Mail Server: prod-mail-server
*/

/*NOTE : - YOU SHOULD NOT STORE SECURITY INFORMATION IN THIS CONFIGURATION FILE E.G. YOUR DATABASE PASSWORD, OR PASSWORD OF YOUR MAIL SERVER BECAUSE ANYONE WHO HAS ACCESS TO YOUR SOURCE CODE WILL HAVE ACCESS TO THOSE INFO.

The way we deal with these secrets is using environment variables
*/

//STORING THE PASSWORD OF A MAIL SERVER SECRETLY

/*Open up the terminal and type "set app_password=1234"
1) Add a new file in the config folder "custom-environment-variables.json" : - Here we define the mapping of configuration settings to environment variables i.e. We will keep secret information like password that are specific to our environment in it.

*/

//custom-environment-variables.json
{
    "mail": {
    "password": "app_password"
}
}

//And to read the password, we include this code in the app.js
console.log("Mail Password: " + config.get("mail.password"));

    /*RESULT : - When we run the app, we get the result : -
Application Name: My Express App-Production
Mail Server: prod-mail-server
Mail Password: 1234

    */

    //CODE REVIEW
///////////////////////////////////////////////////////////////////////////
///// REQUIRED PACKAGES //////////////////////////////////////////////////

//loading the config folder
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger");
const authentication = require("./authentication");
const express = require("express");
const app = express();
///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
///////// RETRIEVING ENV DETAILS ///////////////////////////////////////////
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

//////////////////////////////////////////////////////////////////////////
/////  MIDDLEWARE   /////////////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(authentication);
app.use(helmet());

//using morgan only in dev env
if (app.get("env") === "development") {
    app.use(morgan("dev"));
    console.log("Morgan enabled....");
}
//////////////////////////////////////////////////////////////////////////

////// DATABASE //////////////////////////
const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];
/////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//HTTP CRUD OPERATIONS
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res
            .status(404)
            .send("The Course you looking for does not exist on this database. ");
        return;
    }
    res.send(course);
});

app.post("/api/courses", (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        // then we exit
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res
            .status(404)
            .send("The Course you looking for does not exist on this database.");
        return;
    }
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    //Else update the course
    course.name = req.body.name;
    //Return the updated course to the client
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res
            .status(404)
            .send("The Course you looking for does not exist on this database. ");
        return;
    }
    const index = courses.indexOf(course);
    //go to the index and remove one object
    courses.splice(index, 1);
    //Return the deleted course
    res.send(course);
});
///////////////////////////////////////////////////////////////////////////////

////// VALIDATION HANDLER /////////////////////////////////////
function validateCourse(course) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };
    return Joi.validate(course, schema);
}
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
/////// PORT CONFIG
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
/////////////////////////////////////////////////////////////////////////////

