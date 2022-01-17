/*We will kick of the section on sending an email by actually sending an email from nodejs.
We wll start by exploring the service we will be using and from there we will actually write a little bit of code to send our very first email from our node app.
Then throughout the section, we will setup emails that get sent when user do things like create their account or delete their account.
The service we will using is SENDGRID from https://sendgrid.com

//REASONS TO USE SENDGRID?
1-  Nice free tier to get started with integrating email to your app before you ever need to pay.
2-  It doesnt require you to have custom domain to setup like other email services do even to just test things out.
3-  With a new account, you get free 40,000 free emails as trial period and then you can send 100 daily forever for free. That may be okay for a real application but it is unlikely if you are using it for a real app that you are charging your customer for using. For that, it pays to upgrade to the Essentials plan for $15/month where you can send up to 100k emails per month.

Sendgrid will give us an api key when we create an account which we will use to send our email from nodejs

a-  Login to your sendgrid account
b-  On the dashboard, we have 3 options to get started, we will be using the first one which is "Integrate using our Web API or SMTP relay"
c-  Click "Start"
d-  On the next page, click on "Web API" -> Node Js
e-  Type an API key "Task App" -> Click on Choose
f-  Copy the key to the clipboard
g-  Create a new dir "emails" in the src folder & inside we create a new file "account.js". The account.js contains all the code for sending emails related to user accounts (signing up or deleting the account)
*/

//SENDING OUR FIRST EMAIL WITH SEND GRID
//loading send grid package
const sgMail = require("@sendgrid/mail");

//our send grid ap key
const sendgridAPIKey =
  "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";
//telling the send grid module d API key we want to use
sgMail.setApiKey(sendgridAPIKey);

//this allows us to send a mail
sgMail.send({
  to: "akindiileteforex@gmail.com",
  from: "akindiileteforex@gmail.com",
  subject: "This is my first creation",
  text: "I hope this one actually get to you"
  //here u can provide html property for styling. (we wont worry abt dt for now)
});

/*To actually send the email, all we need to do is run the script "node src/emails/accounts.js

You can confirm if the email actually works by : -
1) Using the send grid interface
2) Checking our mailbox"*/

/*Back to the sendgrid opened dashboard, tick "I've integrated the code above" and click Next
 * - On the next page, click on "Verify integration".
 * -  On the next page you should get the message "It worked" if you implement everything well.


Now, the email we sent might have entered the spam folder because we used "akindiileteforex@gmail.com" for both the sender and receiver which appears like a spoof. To fix this, we need to verify the welcome email from sendgrid and then setup a domain for our account, so we will be able to send email from addresses that ends with our domain name*/
