/*Here we will be writing a few more tests related to the user then in the next lesson we will write some tests focused on our tasks.
Now there are some techniques we need to add to our toolbelt which is how to send file using our "supertest".
So we will create a new test that uploads an avatar using our avatar endpoint and we ensure we get a buffer stored in the avatar field in d database.

To do this, we need to gt access to d image we can upload in d test cases and to do this, we will create a new dir in the "tests" dir and the dir will be called "fixtures" (fixtures in a test world allows u to set environments ur tests are going to run in), so we will put an image inside the fixtures dir that our test file can use when they are trying to upload image to the server to test that endpoint.
1-  Create the "fixtures" dir and paste the profile-pic.jpg image into the dir. So now we have an image we can use when testing the upload route.
*/

//Upload user avatar test
test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    //to upload a file, we use "attach()" with 2 args, the property name (avatar) and the path to the file
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
});

/*Now we can write more advanced assertions : -
 * 1-  To test that binary data was indeed saved in the database. Before we do this, there is something about assertion which we need to talk about : -
If we write assertion to expect if an empty object is equals to another empty object like this below : - expect({}).toBe({}); This test will fail because Jest uses strict equality === for ".toBe" and in JS {} !== {} even if they have the same properties and value. So we will need to use ".toEqual" instead of ".toBe".... ".toEqual" does not use strict equality but uses an algorithm that compares the properties inside the two objects and compare those and in this case : - expect({}).toEqual({}); will pass*/

//CHECKING IF THE AVATAR FIELD IN THE USER DOCUMENT IS A BUFFER
test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    //to upload a file, we use "attach()" with 2 args, the property name (avatar) and the path to the file
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
  //Assertion to confirm dt binary data was indeed stored in d db
  const user = await User.findById(userOne._id);
  //ds checks if user.avatar is of type "Buffer" in the db. U can use d syntax below to check for "string,number" etc.
  expect(user.avatar).toEqual(expect.any(Buffer));
});

/*CHALLENGE : - Test user updates
 * 1-  Create "should update valid user fields"
 *       Update the name of the test user
 *       Check the database to confirm it's changed
 * 2-  Create "Should not update invalid user fields"
 *       Update a "location" field and expect error status code
 * 3-  Test your work*/
//Valid user update test
test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Omoakin"
    })
    .expect(200);
  //Advanced assertion to check if the user.name === "Omoakin"
  const user = await User.findById(userOne._id);
  expect(user.name).toEqual("Omoakin");
});

//Invalid user update test
test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    //trying to update invalid field
    .send({
      location: "Ibeju-lekki"
    })
    .expect(400);
});
