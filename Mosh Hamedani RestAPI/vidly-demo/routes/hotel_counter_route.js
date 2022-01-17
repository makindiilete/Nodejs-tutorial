const { Hotel_Counter, validate } = require("../models/hotel_counter_model");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");

//MONGODB DATABASE OBJECTS - GET THE LIST OF ALL THE GENRES
router.get("/", cors(), async (req, res) => {
  const counters = await Hotel_Counter.find();
  res.send(counters);
});

//MONGODB DATABASE  POST REQUEST - CREATE A NEW GENRE OBJECT
router.post("/", async (req, res) => {
  //  input validation using function defined
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const counters = new Hotel_Counter({
    name: req.body.name
  });
  const result = await counters.save();
  console.log(result);
  res.send(counters);
});

module.exports = router;
