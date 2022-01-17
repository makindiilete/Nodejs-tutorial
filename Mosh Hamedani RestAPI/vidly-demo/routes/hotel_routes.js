const { Hotel, validate } = require("../models/hotel_model");
const { Hotel_Counter } = require("../models/hotel_counter_model");
//loading fawn to implement two phase commits.
const Fawn = require("fawn");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");

//MONGODB DATABASE OBJECTS - GET THE LIST OF ALL THE hotelS
router.get("/", cors(), async (req, res) => {
  const hotels = await Hotel.find().select("-hotel_counter");
  res.send(hotels);
});

//MONGODB GET SINGLE OBJECT - GET A SINGLE OBJECT BY ID
router.get("/:id", async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    res.status(404).send("Such hotel does not exist");
    return;
  }
  res.send(hotel);
});

//MONGODB DATABASE  POST REQUEST - CREATE A NEW hotel OBJECT
router.post("/", async (req, res) => {
  //  input validation using function defined
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  // //here we check to confirm the hotel_counter sent exist in the database
  // This field "req.body.hotel_counterId" will appear in post request as "hotel_counterId": "5d0eb83e68c4a130608422fe"
  // because we are using the same counter database, so we hardcoded the collection id here so we wont need to declare it again in our front end
  const hotel_counter = await Hotel_Counter.findById(
    "5d0eb83e68c4a130608422fe"
  );

  //here we are checking to ensure the hotel_counter we are renting out is still in stock
  /*  if (hotel_counter.numberInStock === 0)
        return res.status(404).send("Current this hotel_counter is out of stock!");*/

  //if the hotel_counter does not exist, we simply return with the error msg
  if (!hotel_counter) {
    res.status(404).send("The hotel counter collection does not exist!");
  }
  const hotel = new Hotel({
    //  here we are setting our _id field to the value of the "myId" field in the embedded document so both can match
    _id: hotel_counter.myId,
    floorNumber: req.body.floorNumber,
    hotel_counter: {
      _id: hotel_counter._id,
      name: hotel_counter.title,
      myId: hotel_counter.myId
    },
    roomNumber: "RM0" + req.body.floorNumber + hotel_counter.myId
  });
  if (req.body.floorNumber === null) {
    res.status(400).send("Floor Number cannot be null");
  }
  if (req.body.floorNumber <= 0) {
    res.status(400).send("Floor Number must be greater than 0");
  }
  if (req.body.floorNumber > 20) {
    res.status(400).send("Floor Number cannot be greater than 20");
  }
  try {
    //  creating new two phase commit task with fawn
    new Fawn.Task()
      //Task 1 : Saving the hotels with 2 args (collection name & document object variable to be saved)
      .save("hotels", hotel)
      //Task 2 : updating the hotel_counters with 2 args (collection name & the id of the hotel_counters to be updated)
      .update(
        "hotel_counters",
        { _id: hotel_counter._id },
        {
          //here we are using the increment function "$inc" and decrementing the "numberInStock" by one "-1"
          $inc: { myId: +1 }
        }
      )
      //    completing the operation with run
      .run();
    //  catching errors (500 code means internal server error)
  } catch (error) {
    res.status(500).send("Something failed....");
  }
  res.send(hotel);
});

//MONGODB DATABASE PUT REQUEST
router.put("/:id", async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Hotel content can not be empty"
    });
  }
  // const hotel_counter = await Hotel_Counter.findById(hotel_counterId);

  const hotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    {
      floorNumber: req.body.floorNumber,
      // here we are using the "req.params.id" which is the id of the object we want to update, we cannot use "hotel_counter.myId" here because it will use the already incremented id which is not the id of the document.
      roomNumber: "RM0" + req.body.floorNumber + req.params.id
    },
    { new: true }
  );
  res.send(hotel);
});

//MONGODB DATA DELETE REQUEST : - here we av 2 middleware functions, first the token will be checked with "auth", next we will verify if the user is an admin with "isAdmin" and if that is the case, the delete route will be executed
// router.delete("/:id", [auth, isAdmin], async (req, res) => {
router.delete("/:id", async (req, res) => {
  const hotel = await Hotel.findByIdAndRemove(req.params.id);
  console.log(hotel);
  if (!hotel)
    return res
      .status(404)
      .send(
        "The hotel you try to delete doesnt exist or might have already been deleted!"
      );
  res.send(hotel);

  // This was the code used to decrement the myId field upon deleting a room but a removed room Id should not be re-assigned because all the activities including the deletion will already be logged and it will create a bad UX if a once deleted room is now getting used again.
  // const counter = await Hotel_Counter.findById("5d0eb83e68c4a130608422fe");
  // counter.myId--;
  // counter.save();
  // console.log("myId is : ", counter.myId);
});
module.exports = router;
