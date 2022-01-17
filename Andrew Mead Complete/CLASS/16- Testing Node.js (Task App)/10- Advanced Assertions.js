/*GOAL: - We will be learning how to perform advanced assertions in our test cases. Assertions that are advanced than the current one we are using which is to check the status code we get in return of the async operation. We can write assertion to check the response body, check the database if everything is okay etc.*/

//ASSERTION TO CHECK IF THE USER WAS TRULY CREATED
test("Should signup a new user", async () => {
  const response = await request(app)
    //method & route path
    .post("/users")
    //user object
    .send({
      name: "Michaelz",
      email: "akindiileteforex@gmail.com",
      password: "123999abc"
    })
    //assertions
    .expect(201);
  //Advanced assertion dt checks if the new user was created successfully
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});

//ASSERTION TO CHECK IF THE CREATED USER PROPERTIES MATCHES WHAT YOU WERE EXPECTING
test("Should signup a new user", async () => {
  const response = await request(app)
    //method & route path
    .post("/users")
    //user object
    .send({
      name: "Michaelz",
      email: "akindiileteforex@gmail.com",
      password: "123999abc"
    })
    //assertions
    .expect(201);
  //Advanced assertion dt checks if the new user was created successfully
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  //Assertion to check if the name property on the user body === "Michaelz"
  expect(response.body.user.name).toBe("Michaelz");
});

/*Now on line 38, we have written our assertion to confirm the name we get back, to check for other properties value then we need to keep writing same code and change the values, there is a better way to do this below : - */
test("Should signup a new user", async () => {
  const response = await request(app)
    //method & route path
    .post("/users")
    //user object
    .send({
      name: "Michaelz",
      email: "akindiileteforex@gmail.com",
      password: "123999abc"
    })
    //assertions
    .expect(201);
  //Advanced assertion dt checks if the new user was created successfully
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  //Assertion to check the whole response body and check if we have this key value pairs inside
  expect(response.body).toMatchObject({
    user: {
      name: "Michaelz",
      email: "akindiileteforex@gmail.com"
    },
    token: user.tokens[0].token
  });
});

//TESTING TO CHECK THE THE PLAIN TEXT PASSWORD IS NOT STORED IN THE DATABASE
test("Should signup a new user", async () => {
  const response = await request(app)
    //method & route path
    .post("/users")
    //user object
    .send({
      name: "Michaelz",
      email: "akindiileteforex@gmail.com",
      password: "123999abc"
    })
    //assertions
    .expect(201);
  //Advanced assertion dt checks if the new user was created successfully
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  //Assertion to check the whole response body and check if we have this key value pairs inside
  expect(response.body).toMatchObject({
    user: {
      name: "Michaelz",
      email: "akindiileteforex@gmail.com"
    },
    token: user.tokens[0].token
  });
  //Assertion to confirm that the plain text password is not stored in d db
  expect(user.password).not.toBe("123999abc");
});

/*When creating text, it might be confusing to figure out what you need to make assertion about (what you need to perform in the test) and the reason is because you can easily go overbore very quickly e.g. We can write assertion to check if creating new user delete existing users in the database, this not likely to happen but we can still write test for it, so it is better to stick to writing assertions for only the things we know that can go wrong which we have written assertions for all of dem.*/

/*CHALLENGE : - Validate new token is saved
 * 1-  Fetch the user from the database
 * 2-  Assert that token in response matches users second token
 * 3-  Test your work*/

//Test to test login route POST /users/login
test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
  //Fetching the user
  const user = await User.findById(userOneId);
  //Assert that token in response matches users second token
  expect(response.body.token).toBe(user.tokens[1].token);
});

/*CHALLENGE : - Validate user is removed
 * 1-  Fetch the user from the database
 * 2-  Assert null response (U sud not be able to fetch d user bcos they sud av bin deleted) (use assertion from sign up test)
 * 3-  Test your work.*/
//TEST FOR DELETE ACCOUNT ROUTE (VALID TOKEN/ SUCCESS CASE)
test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    //here we pass our auth token to the test
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  //Fetching the user
  const user = await User.findById(userOne._id);
  expect(user).toBeNull();
});
