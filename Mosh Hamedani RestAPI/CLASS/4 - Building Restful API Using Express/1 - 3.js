// Introduction : - Express is a fast and light-weight framework for building web applications.

// RESTful Services : - This is also called Restful APIs. The architecture of our apps includes a Client side (front-end) and the Server (backend), the client side talks to the server to get or save the data. This communication happens using the HTTP protocol. So on the server, we exposed some "services (remember normal angular services for CRUD operations e.g. 'getUser')" which can be accessible via the http protocol, the client can then directly call this services by sending http requests.

// REST : - Representational State Transfer. REST is just a convention for building this http services. So we use simple http principles to provide support to CREATE, READ, UPDATE & DELETE data (CRUD Operations).

/*Real word scenario : - We have a company by the name VIDLY that is a movie rental company, on the endpoint the can have something like "http://vidly.com/api/customers", the client can send http request to this endpoint to talk to our service.
 * Breakdown of the endpoint "http://vidly.com/api/customers"
 * 1) http:// - this can be this or https:// depending on the security level
 * 2) vidly.com - this is the domain of the application
 * 3) api - this is not compulsory but alot of companies follows this convention to expose their restful services. This can sometimes be written as "http://api.vidly.com"
 * 4) /customers - This refers to the collections of customers in our application.In the REST world, we refer to the "/customers" as a resource. We can expose our resources such as "customers, movies, rentals etc
 *
 * All the CRUD operations will be done by sending an http request to this endpoint. The type of the http request will determine the type of operation.
 *
 * STANDARD HTTP METHODS
 *
 * GET - Getting Data - Get /api/customers - We get http response of array of all customers ( Get /api/customers/1 - We get http response that returns the customer with the id of 1)
 * PUT - Updating Data - PUT /api/customers/1 (we include the id of the customer to be updated and the put request must also contain a body : {name: ''})- The server updates the customer with the given id according to the value we sent.
 * DELETE - Deleting Data. - DELETE /api/customers/1 - Customer with the id specified will be deleted
 * POST - Creating Data - POST /api/customers (we include the customer object in the body of the request : {name: ''}) - The server gets the customer object  and create a customer for us
 * */

// Express : - Express is the most popular framework for building web server upon node.
