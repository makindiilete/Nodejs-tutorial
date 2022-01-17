/*We will learn how to create a link between the image uploaded and the user who uploaded it.
Right now, all of our avatar pictures are been dumped into the directory and there is no link between the user who created it and the image that was uploaded and our file upload route is not even behind authentication so we need to fix those bugs.
1-  We start by putting our route behind authentication.
2-  Then we will create a place on the user model for the image data to be stored : - Instead of storing our image on the file system inside the computer, we will store it in the user model under image binary data.
3-  Finally we will create a route that authenticated users can use to delete a profile picture they have set.*/

//FILE UPLOAD TO EXPRESS WITH FILE TYPE & FILE SIZE VALIDATION
const multer = require("multer");
const upload = multer({
  //we remove the dest property so we can stop saving into file system and save on database
  // dest: "avatar",
  limits: {
    fileSize: 1000000 //1mb limit
  },
  fileFilter(req, file, cb) {
    //if file uploaded is not any of jpg,jpeg or png format
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      //we return an error
      return cb(new Error("Please upload an image."));
    }
    //else we pass the upload
    cb(undefined, true);
  }
});

//UPLOAD USER AVATAR (path, authentication, file upload middleware, route handler, file upload error handler)
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    //d line below replaced the "dest: "avatar" we commented out and save user image to db (req.user.avatar -> d avatar field in d model, req.file.buffer -> multer gvs us ds to be able to save our image)
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  //this handles file upload errors
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

/*Now if we save the file and go back to our user avatar request in postman to upload an image, we get 200 OK response and if we check our mongo database, we now have a new filed added with the name "binary".*/

/*HOW TO RENDER THE BINARY DATA WITH HTML IN THE BROWSER.
1-  Click on "Edit Document"
2-  On the binary field, we want to select all the binary characters inside the quote without copying the quote, so select part of the string and use the scroll bar to scroll down >> hold down shift and click the end of the string to select all
3-  Copy to clipboard
4-  We will head on to our browser and open one of the online html editor like codepen, jsbin, sandbox. We will use jsbin
5-  Open jsbin @ https://jsbin.com
6-  Click on HTML tab and write your code using the format below

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
<h1>Test</h1>
  <img src="data:image/jpg;base64, paste ur binary code here">
  </body>
  </html>
  //Sample is inside avatar html.txt
*/

/*CHALLENGE : - Setup route to delete avatar
1-  Setup DELETE /users/me/avatar
2-  Add authentication
3-  Set the field to undefined and save the user sending back a 200
4-  Test your work by creating new request for Task App in Postman*/

//DELETE PROFILE IMAGE
router.delete("/users/me/avatar", auth, async (req, res) => {
  //ds line delete the profile image
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});
