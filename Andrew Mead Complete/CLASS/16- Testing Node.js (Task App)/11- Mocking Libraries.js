/*Goal : - How to mock our npm modules
MOCKING : - Is the process of replacing the real function that runs with the function you create when you are running in a test environment.
WHY R WE GOING TO NEED SOMETHING LIKE THIS?
If we look at our tests, the signup tests, the delete account tests, we know when we run these tests, emails are sent behind the scene and this emails are sent to email addresses that doesnt exist and will never be checked and that alone might not be the worst thing but the worst thing is we are automatically re-running each of our test cases and we keep sending unnecessary emails been sent from our sendgrid account.
If we are on the free plan, we know we do not have many free emails to send and if we are on a paid plan, that means we are wasting money on emails that will never be opened, with MOCKING, we can make sure that when our program is running using JEST, we do not actually send those emails off.

1-  We will start by creating the dir where we will store our mocks >>> Inside the "tests" folder, create a new dir "__mocks__", this is the dir name that JEST will look for.
2-  Now in this directory, we can create files for individual modules that we are trying to mock, to mock JWT npm module, we create "jsonwentoken.js" in the mock dir.
3-  In this case, we are trying to mock the sendgrid npm module "@sendgrid/mail", with the way the npm module name is structured, it means in the mock directory, we will create a folder with the name "@sendgrid" and inside that dir, we create a file "mail.js"
4-  That will allow us to create the mock, providing our own version of "setAPIKey" & ".send" to use when running in test mode.
5-  It is important that when we are mocking a module, we provide all the things that the module needs in other to work. So using sendgrid module, from the "account.js" file, we can figure out things that our app needs to use the module which are : setApiKey & .send.  So to mock the sendgrid module, we need to provide all of these so the code does not fail.
6-  Currently, after creating a mock file for the sendgrid module, if we check our tests, we see that it is failing with the message "TypeError: sgMail.setApiKey is not a function". This is because we have created a mock for the module but we have not exported a value for the setApiKey so we need to do dt now*/

//mocking & exporting @sendgrid/mail module
module.exports = {
  setApiKey() {},
  send() {}
};
/*When it comes to mocking, you could choose to accept args and then return some sought of fixed value if that npm module you are mocking does that i.e. it returns a value. In this case in "accounts.js", we have the setApiKey() function accepting our API KEY and the .send() function accepting the email to be sent but we are not doing anything with what we get in return so there is no need to do anything inside the mock functions, all it will do is allow the function to be called from "mail.js" but in reality, nothing is happening behind the scene so in the test environments, no api key will be set and no email will be sent*/

/*To learn more about MOCKING, you can check the Jest docs >>> Guides >>> Manual Mocks.*/
