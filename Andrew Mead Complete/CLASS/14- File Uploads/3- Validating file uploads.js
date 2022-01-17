/*In this lesson, we will add validations to the files that are been uploaded to your server.

TWO THINGS TO VALIDATE
1-  The file size : - We want to restrict the file size to a limit, we do not want to allow a heavy giga-byte file to be uploaded for something simple like a profile picture. In that case, 1-2mb will be plenty
2-  The file type : - We might want to require that only pdf is uploaded for the "/upload" route and that only jpg is uploaded for the avatar route.
*/

//FILE SIZE VALIDATION
//FILE UPLOAD TO EXPRESS
const multer = require("multer");
const upload = multer({
  //dest = destination (folder where all d uploads sud b stored)
  dest: "avatar",
  //  file size validation
  limits: {
    //max file size
    fileSize: 1000000 //this is in bytes so 1million = 1mb
  }
});
/*Now if we go back to the upload route after setting this limit and try to add a file above 1mb, we get an error that file too large.*/

//FILE TYPE VALIDATION
//FILE UPLOAD TO EXPRESS
const multer = require("multer");
//configuring multer to tell it d type of file we want to accept. This configuration will change as the type of file we want to upload changes. But for now we will just accept any type of file
const upload = multer({
  //dest = destination (folder where all d uploads sud b stored)
  dest: "images",
  //  file size validation
  limits: {
    //max file size
    fileSize: 1000000 //this is in bytes so 1million = 1mb
  },
  //file type validation (req => request bin made, file => file type, cb => callback to call when done
  fileFilter(req, file, cb) {
    //  various way to use cb
    //  To send an error => cb(new Error("File must be a PDF"))
    // To accept the upload => cb(undefined, true)
    //To silently reject the upload => cb(undefined, false) -> We wont be using this because we either want to accept d upload or send an error

    //getting d name of d uploaded file to check the extension and verify it.
    //if the file d user uploaded does not ends with .pdf (that is it is not a pdf doc), we return an error
    if (!file.originalname.endsWith(".pdf")) {
      return cb(new Error("Please upload a PDF"));
    }
    //else we accept the upload
    cb(undefined, true);
  }
});

//CREATING AN ENDPOINT WHERE USER CAN USE TO UPLOAD THE FILES
//we provided multer middleware (upload.single) which takes an arg which is a name for d upload
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

/*
NOW WE HAVE TWO VALIDATIONS IN PLACE
A-  File size validation of 1mb max
B-  File type validation of PDF only

1-  Now if we go back to POSTMAN and try to upload any file that is not pdf, we get the error we specified, if we upload pdf that is size is bigger than 1mb, we get the file size validation error, but if we upload aa PDF that is not above 1mb, our file get uploaded successfully.*/

//SUPPORTING MULTIPLE DOCUMENTS EXTENSIONS : -  We might want our validation to support multiple file extensions e.g. .docx & .doc for old ms word and new ms word documents

//FILE UPLOAD TO EXPRESS
const multer = require("multer");
//configuring multer to tell it d type of file we want to accept. This configuration will change as the type of file we want to upload changes. But for now we will just accept any type of file
const upload = multer({
  //dest = destination (folder where all d uploads sud b stored)
  dest: "images",
  //  file size validation
  limits: {
    //max file size
    fileSize: 1000000 //this is in bytes so 1million = 1mb
  },
  //file type validation (req => request bin made, file => file type, cb => callback to call when done
  fileFilter(req, file, cb) {
    //  various way to use cb
    //  To send an error => cb(new Error("File must be a PDF"))
    // To accept the upload => cb(undefined, true)
    //To silently reject the upload => cb(undefined, false) -> We wont be using this because we either want to accept d upload or send an error

    //getting d name of d uploaded file to check the extension and verify it.
    //if the file d user uploaded does not ends with either .doc OR .docx (regular expression from regex101.com)
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please upload a Word document"));
    }
    //else we accept the upload
    cb(undefined, true);
  }
});

//CREATING AN ENDPOINT WHERE USER CAN USE TO UPLOAD THE FILES
//we provided multer middleware (upload.single) which takes an arg which is a name for d upload
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

/*Now if we try to upload any document that is not a word document, our upload will fail but if we upload a word document with either .doc OR .docx, both will upload successfully*/
