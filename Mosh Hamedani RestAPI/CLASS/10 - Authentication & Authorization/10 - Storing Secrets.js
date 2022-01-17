/*We already learnt about a npm package "config" which we use to store the configurations of our app in json file or env variables. So we will be taking our jwt private key out and store it in an environment variable because we should never store secrets in our code base.

1) npm i config@1.29.4
2) create a new folder "config"
3) Inside the folder, we add a new file "default.json"
4) We add another file "custom-environment-variables.json" here we specify the mapping between our application settings and environment variables
*/

//STORING THE ENVIRONMENT VARIABLE
/*Go to the terminal and run the code : - "set vidly_jwtPrivateKey=mySecureKey"*/

//default.json file
{
    "jwtPrivateKey": ""
}

//custom-environment-variables file
{
    "jwtPrivateKey": "vidly_jwtPrivateKey"
}

//App.js
//loading the config package for where we can access the private key
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres_route");
const customers = require("./routes/customers_route");
const rentals = require("./routes/rentals_route");
const movies = require("./routes/movies_route");
const users = require("./routes/users_route");
const auth = require("./routes/auth");
const app = express();

//checking for our jwt private key when the application starts
if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    //then we exit the process (0 = success, any other number means error)
    process.exit(1);
}

//Here we create our database, the name will be what we define after "mongodb://localhost/"
mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to MongoDB......"))
    .catch(error => console.error("Could not connect to MongoDB....", error));

// needed to be able to post in json
app.use(express.json());

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////ENDPOINTS & THEIR ROUTES/////////////////////////////////////////////////////////////////////
app.use("/api/genres", genres);

app.use("/api/customers", customers);

app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Listening to port
const port = 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));



//auth.js
const config = require("config");
const bcrypt = require("bcrypt");
const { User } = require("../models/users_model");
const lodash = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
//loading jwt
const jwt = require("jsonwebtoken");

//MONGODB AUTHENTICATION WITH POST REQUEST
router.post("/", async (req, res) => {
    //  input validation using function defined
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    //checking if the user already exist in the database to avoid duplicate reg.
    let user = await User.findOne({ email: req.body.email });
    //if the user that is trying to login does not exist
    if (!user) return res.status(400).send("Invalid email or password..");

    //  validating the plain text password d user enters with the hashed passwords in the database: the first arg is the plain text password, the 2nd is the hash password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    //if the password d client enters is invalid
    if (!validPassword)
        return res.status(400).send("Invalid email or password..");
    //now we pass the env variable name here from where the secret key will be retrieved
    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

    //if all the details are correct, we return the jwt token to the client
    res.send(token);
});

// AUTH VALIDATION HANDLER
function validate(req) {
    const schema = {
        email: Joi.string()
            .min(5)
            .max(255)
            .email({ minDomainAtoms: 2 })
            .required(),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .min(5)
            .max(255)
            .required()
    };
    return Joi.validate(req, schema);
}
module.exports = router;

/*So now if we go back to postman and send auth req against, we get our jwtoken with our private key stored in our environment variable.*/
