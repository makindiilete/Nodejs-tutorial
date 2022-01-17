/*Currently in our vidly app, if we post an invalid id a customer id or movie id, on sending the request, the requests hangs and we get error message in the terminal. This is not a good implementation as we the client is suppose to get a 400 error which means bad request because the server could not complete the request.....

We can modify our JOI validation to also validate our object IDs, using an npm package "joi-objectid"
*/

//Load the module

//loading joi-objectid validation package
Joi.objectId = require("joi-objectid")(Joi);

//in the joi validation function, modify it from this: -

// JOI VALIDATION HANDLER
function validateRental(rental) {
  const schema = {
    movieId: Joi.string().required(),
    customerId: Joi.string().required()
  };
  return Joi.validate(rental, schema);
}

//TO
// JOI VALIDATION HANDLER
function validateRental(rental) {
  const schema = {
    movieId: Joi.objectId().required(),
    customerId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
}

/*Now if we send a post request with invalid objectid, we get a 400 bad request and the error ""movieId" with value "1234" fails to match the required pattern: /^[0-9a-fA-F]{24}$/" in postman and we no longer get the error in the terminal*/
