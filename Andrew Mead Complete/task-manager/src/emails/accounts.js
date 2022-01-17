//loading send grid package
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const path = require("path");

/*//our send grid ap key
const sendgridAPIKey =
  "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";*/
//telling the send grid module d API key we want to use which is now stored in our env variable (env variable sud b in uppercase with underscore to separate texts)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Log verification link to file
const logVerificationLink = (userId, verificationCode) => {
  const file = path.join(__dirname, "Logs", "emailLogs.txt");
  if (!fs.existsSync(file)) {
    // then create it
    fs.mkdir(path.join(__dirname, "Logs"), err => console.log(err));
  }
  fs.writeFile(
    file,
    `http://localhost:4000/verification/${userId}/${verificationCode}`,
    err => {
      if (err) {
        throw err;
      } else {
        console.log("Verification Link Logged To File");
      }
    }
  );
};

//this function will be called when a user signup in user.js router
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "michaelz@sahel.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. let me know how you get along with the app.`
    // html: "<h1>Welcome To The App</h1>"
  });
};

//this function will be called when a user delete his/her account in user.js router
const sendAccountDeleteEmail = (email, name) => {
  const faq = "https://bit.ly/sahelapp";
  sgMail.send({
    to: email,
    from: "michaelz@sahel.com",
    subject: "So sad to se you leave!",
    text: `It is so sad to see you leave, ${name}. Please fill this questionnaire to let us know how we would have served you better. ${faq}`
    // html: "<h1>We are sorry we could not serve you better!</h1>"
  });
};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail,
  sendAccountDeleteEmail: sendAccountDeleteEmail,
  logVerificationLink: logVerificationLink
};

// export { sendWelcomeEmail, sendAccountDeleteEmail };
