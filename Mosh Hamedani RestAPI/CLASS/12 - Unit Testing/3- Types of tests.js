/*In Automated testing we have 3 types of tests:

UNIT TEST: - Testing a unit of an app without its "external" dependencies e.g files, databases, msg queues, web services etc. They are cheap to write and execute fast so you can run 100s in a second and this way you can verify that each building block in your app is working as expected. But you wont get alot of confidence in the reliability of the app since you are not testing with the "external" dependencies. That is where integration test comes to the rescue.
INTEGRATION TEST: - Here we test an app with its "external" dependencies. They take longer to execute because they often involve reading or writing to a database or file but they give you more confidence in the health of your app.
END TO END TEST: - They drives an app through its UI. They give you the greatest confidence but with 2 big problems: 1) They are very slow bcos they require launching the app and testing through its UI. 2) They are very brittle/fragile bcos a small change to the app can easily break this test
*/
