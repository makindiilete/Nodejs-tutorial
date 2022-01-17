/*we have used supertest to test signup routes that creates data and the login route which needs the user details to be in existent in d database.
GOAL : - In this lesson, we will learn how to test an endpoint that requires authentication in order to work such as the endpoint for getting your user profile or for deleting the account.

To get this token, we need a JWT that supertest can actually access just as we create a user object for our login test. So what we do is we modify our code to make sure that when we create a user, they have a token we can use for our test cases. What we will be doing is creating an id for our user before hand and also defining a token for them so before they are created, we already have access to their id and token and we can use them
*/

//Test for fetching users profile with auth token
test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    //here we pass our auth token to the test
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

/*Now running the tests again, everything passed successfully.*/

//Testing to ensure user not authenticated cannot fetch their profiles
test("Should not get profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    //we suppose to pass our token here but we pass non so we are not authenticated
    .send()
    .expect(401);
});

/*CHALLENGE : - Test delete account
 * 1-  Create "Should delete account for user
 *         Setup auth header and expect correct status code
 * 2-  Create "Should not delete account for unauthenticated user"
 *         Expect correct status code
 * 3-  Test your work
 * */

//TEST FOR DELETE ACCOUNT ROUTE (VALID TOKEN/ SUCCESS CASE)
test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    //here we pass our auth token to the test
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

//TEST FOR DELETE ACCOUNT ROUTE (INVALID OR NO TOKEN/ FAILURE CASE)
test("Should not delete account for unauthenticated user", async () => {
  await request(app)
    .delete("/users/me")
    //here we pass no auth token to the test
    .send()
    .expect(401);
});
