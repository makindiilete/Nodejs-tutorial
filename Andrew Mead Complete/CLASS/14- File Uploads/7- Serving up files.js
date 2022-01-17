/*In this lesson, we will learn how to serve up our user avatars. We already explored one way through jsbin but this second approach will serve the image up and give us a url we can use in the html img tag so we can use when creating the client side and something we can also view from the browser directly.
 *
 * To get this done, we will setup our 3rd and final route relating to user avatars. This one will be for fetching the avatar and getting the image back.*/

//FETCHING USER AVATAR VIA URL LINK AND USER ID
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //if we cannot find the user by the id in the url or we find the user but the user does not have an avatar
    if (!user || !user.avatar) {
      throw new Error();
    }
    //telling the user the type of image they are getting back by setting the content type header
    res.set("Content-Type", "image/jpg");
    //ds send back the avatar we av found
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

/*Now if we upload a new image for a user and we check the url in the browser : - http://localhost:3000/users/5d75ccf275f1e552783fc2b3/avatar
 * we get back our image*/
