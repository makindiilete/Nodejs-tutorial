/*We dont need to implement another route for deleting users jwt to log them out because their tokens are not stored in the server. Storing users tokens in the server is a bad practice because if an hacker access your database, they dont need passwords to execute request on behalf of users AND IF YOU MUST STORE YOUR TOKENS IN THE SERVER, MAKE SURE YOU HASH IT JUST LIKE THE PASSWORDS.
 *
 *
 * So to log out a user, you implement it on the client not on the server i.e. on the client application, when a user want to logout, you simply deletes the token from the localStorage.*/
