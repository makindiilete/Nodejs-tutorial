//mocking & exporting @sendgrid/mail module
module.exports = {
  setApiKey() {},
  send() {}
};
/*When it comes to mocking, you could choose to accept args and then return some sought of fixed value if that npm module you are mocking does that i.e. it returns a value. In this case in "accounts.js", we have the setApiKey() function accepting our API KEY and the .send() function accepting the email to be sent but we are not doing anything with what we get in return so there is no need to do anything inside the mock functions, all it will do is allow the function to be called from "mail.js" but in reality, nothing is happening behind the scene so in the test environments, no api key will be set and no email will be sent*/
