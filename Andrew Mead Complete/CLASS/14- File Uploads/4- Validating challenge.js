/*CHALLENGE : - Add validation to avatar upload route
 * 1-  Limit the upload size to 1mb
 * 2-  Only allow jpg, jpeg, png
 * 3-  Test your work
 *         Upload larger files (should fail)
 *         Upload non-images (should fail)*/

//user.js
//FILE UPLOAD TO EXPRESS WITH FILE TYPE & FILE SIZE VALIDATION
const multer = require("multer");
const upload = multer({
  //dest = destination (folder where all d uploads sud b stored)
  dest: "avatar",
  limits: {
    fileSize: 1000000 //1mb limit
  },
  fileFilter(req, file, cb) {
    //if file uploaded is not any of jpg,jpeg or png format
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      //we return an error
      return cb(new Error("Please upload an image"));
    }
    //else we pass the upload
    cb(undefined, true);
  }
});
