/*So far we have been storing our password as plain text in the database, this is very well so in this lesson we will be learning how to hash the passwords into longer strings using a npm library "bcrypt"*/

//Testing salt in action
const bcrypt = require("bcrypt");

/*To hash a password with bcrypt, we need a "salt", this are random numbers added to our password before the are hashed so that the generated hash cannot be hacked because different strings everytime we hash our password.*/
async function run() {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
}
run();

//RESULT : - $2b$10$gReeWoBUgHp8YxJ7t0ZSne        So this will be added to our hashed password

//Hashing a password
const bcrypt = require("bcrypt");

async function run() {
  //  declaring our salt and passing the number of rounds it will be randomly generated
  const salt = await bcrypt.genSalt(10);
  // declaring our hashed, passing the password "1234" and th salt
  const hashed = await bcrypt.hash("1234", salt);
  console.log(salt);
  console.log(hashed);
}
run();

/*RESULT
$2b$10$1/B368/7YXLpF7NSKEF3uu : - Our salt
$2b$10$1/B368/7YXLpF7NSKEF3uuPrBu2f40YJOXuGsvQ6p4KUjVdCTNmpe : - Our salt + our hashed password
*/

//MODIFYING OUR USER ROUTES FOR PASS HASHING
//MONGODB DATABASE  POST REQUEST - CREATE A NEW USER
router.post("/", async (req, res) => {
  //  input validation using function defined
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //checking if the user already exist in the database to avoid duplicate reg.
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered...");

  //setting the user properties with lodash
  user = new User(lodash.pick(req.body, ["name", "email", "password"]));
  //bcrypt salt
  const salt = await bcrypt.genSalt(10);
  //hashing the user password
  user.password = await bcrypt.hash(user.password, salt);

  const result = await user.save();
  console.log(result);
  //USING LODASH TO PICK THE NAME, EMAIL AND ANY OTHER PROPERTY FROM THE TOTAL PROPERTIES AND SEND ONLY THOSE TO CLIENTS AFTER REGISTRATION
  res.send(lodash.pick(user, ["_id", "name", "email"]));
});

/*if we delete the users collection and re-run the app, on registering a new user, the details is saved as

{ _id: 5d07b7ef5600a63bf4e86df3,
  name: 'Michaelz Omoakin',
  email: 'akindiileteforex@gmail.com',
  password:
   '$2b$10$VkOWAVnJbdHQL07n4LBq2O/oIQBkc65qKMBhkVpx8LAIAvvqv/NeW',
  __v: 0 }
*/
