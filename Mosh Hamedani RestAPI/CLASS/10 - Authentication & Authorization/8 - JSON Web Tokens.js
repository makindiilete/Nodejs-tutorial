/*Now we have an endpoint for authenticating users, so now we need the modify the response sent while users are authenticated from returning "true" to returning a "JSON Web Token".

JSON WEB TOKEN: - This is a long string that identifies a user, this is like your drivers licence or passport. When a client log in, a JWT is generatd for them which is stored in the client side and next time they need to login, this JWT is requested by the server to authenticate them.

The client can be a web app or mobile app. For web app, we can use local storage and for mobile we have something similar, depending on the platform you use.*/

/*Example of JWT can be found in "http://jwt.io".

In the JWT page, we have 3 color coded sections, the purple part is the most important, this contains few properties added to the JWT that identifies the user e.g. "id, name, isAdmin"
*/
