/*A middleware function is basically a function that takes a request object and either return a response to the client or passes control to another middleware function.
 * We have already seen an example of this middleware in our route handler functions that we used for CRUD operations e.g.
 */
(req, res) => {
  res.send(courses);
};

//This we extracted from : -
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

/*Every route handler function we have is technically a middleware function because it takes request object and in the cases we have been using so far, it returns a response to the client. So it terminates the request - response cycle.
 *
 * Another example of middleware function we already used is the 'express.json' that we used to send a json post request. In this case it reads the request and if there is a json object in the body of the request, it parse the body of the request into a JSON object and then it will set "req.body" property */

app.use(express.json()); //This set the "req.body" property

/*So Express includes some built in middleware functions which we have talked about some of them but we can also a custom middleware functions which we can put at the front of our request processing pipeline. So every request we get from the server will go through our middleware function, with this custom middleware function, we can perform cross cutting concerns e.g. logging, authentication, authorization etc. So an express application is nothing but a bunch of middleware functions. */
