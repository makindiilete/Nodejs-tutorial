/*So far we have implemented 4 endpoints: -

/api/genres
/api/movies
/api/customers
/api/rentals

AUTHENTICATION: - This is the process of ensuring users are who they claim they are, that is when we login, we send our username & password to the server and the server authenticates us.
AUTHORIZATION: - This is the process where the server determines if the user has the right permission to perform the given operation.

1) Authentication : In our vidly app, we want to ensure only authenticated user can perform operations to modify data, so if they are not logged in, they can only read data from our end points, to send a post request to create a movies, genres, they must be authenticated first.

2) Authorization : In our vidly app, we want to ensure only admin user can delete data

*/

/*To implement this two new features, we need to add more endpoint to our routes
1) Registering users: We will create a POST route to /api/users
2) Log in users: We will use POST request to login users to /api/logins (logins will be saved to this collection "logins".
*/

/*Assignment:
implement the register user routes with this schemas: -
name:
email: set a property "unique:true" so we will ensure we dont have multiple users with same email
password:
*/
