/*In some relational database like mysql, we have the concept of transactions which means a group of operations that are performed as a unit. All the operations must completes but if one of the operations fails in the middle, the database will be rolled back to its default state.

In mongodb, we dont have transaction but we have "two phase commit" which is really beyond this course but to learn more, search for "mongodb 2 phase commit" in google.

We will be using an npm library called FAWN that implements this transaction using the concept of two phase commits.

So with this package, we can update our vidly database to ensure that updating both the "movie.numberInStock--" and "rental.save()" gets completed else we roll back :

  const result = await rental.save();
  console.log(result);
  movie.numberInStock--;
  const movieResult = await movie.save();


With Fawn we have : -
.save : to save an operation
.update : for updating
.remove: for removing
*/

//BEFORE APPLYING TRANSACTION/TWO PHASE COMMITS
//MONGODB DATABASE  POST REQUEST - CREATE A NEW GENRE OBJECT
router.post("/", async (req, res) => {
  //  input validation using function defined
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  // //here we check to confirm the movie sent exist in the database
  const movie = await Movie.findById(req.body.movieId);

  //here we check to confirm the customer sent exist in the database
  const customer = await Customer.findById(req.body.customerId);

  //here we are checking to ensure the movie we are renting out is still in stock
  if (movie.numberInStock === 0)
    return res.status(404).send("Current this movie is out of stock!");

  //if the customer does not exist, we simply return with the error msg
  if (!customer) {
    res.status(404).send("This customer doesnt exist in the database");
  }
  //if the movie does not exist, we simply return with the error msg
  if (!movie) {
    res.status(404).send("This movie doesnt exist in the database");
  }
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  const result = await rental.save();
  console.log(result);
  // here we apply decrement to the numberInStock because once a movie goes out for rent, we will have one movie less in the shop so here we want to update this in the movie database
  movie.numberInStock--;
  const movieResult = await movie.save();
  console.log(movieResult);
  res.send(rental);
});

//AFTER APPLYING TRANSACTION/TWO PHASE COMMITS

//MONGODB DATABASE  POST REQUEST - CREATE A NEW GENRE OBJECT
router.post("/", async (req, res) => {
  //  input validation using function defined
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  // //here we check to confirm the movie sent exist in the database
  const movie = await Movie.findById(req.body.movieId);

  //here we check to confirm the customer sent exist in the database
  const customer = await Customer.findById(req.body.customerId);

  //here we are checking to ensure the movie we are renting out is still in stock
  if (movie.numberInStock === 0)
    return res.status(404).send("Current this movie is out of stock!");

  //if the customer does not exist, we simply return with the error msg
  if (!customer) {
    res.status(404).send("This customer doesnt exist in the database");
  }
  //if the movie does not exist, we simply return with the error msg
  if (!movie) {
    res.status(404).send("This movie doesnt exist in the database");
  }
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  try {
    //  creating new two phase commit task with fawn
    new Fawn.Task()
      //Task 1 : Saving the rentals with 2 args (collection name & document object variable to be saved)
      .save("rentals", rental)
      //Task 2 : updating the movies with 2 args (collection name & the id of the movies to be updated)
      .update(
        "movies",
        { _id: movie._id },
        {
          //here we are using the increment function "$inc" and decrementing the "numberInStock" by one "-1"
          $inc: { numberInStock: -1 }
        }
      )
      //    completing the operation with run
      .run();
    //  catching errors (500 code means internal server error)
  } catch (error) {
    res.status(500).send("Something failed....");
  }
  res.send(rental);
});

/*If you run the code and send a post request, you will see that "numberInStock" gets updated in the movies database but not only this, we also have a strange collection we didnt create "ojlinttaskcollections". This is created by FAWN in other to perform ins operations, so the tasks are first executed here and if all tasks get processed successfully, the document will be removed from this strange collection and moved to the rentals.*/
