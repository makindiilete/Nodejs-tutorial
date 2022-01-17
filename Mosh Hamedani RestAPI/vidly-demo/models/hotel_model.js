const Joi = require("joi");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const connection = mongoose.createConnection("mongodb://localhost/vidly");

autoIncrement.initialize(connection);

const hotelSchema = new mongoose.Schema({
  floorNumber: {
    type: Number,
    required: true
  },
  myId: {
    type: Number
  },
  roomNumber: {
    type: String
  },
  hotel_counter: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      myId: Number
    })
  }
});

hotelSchema.plugin(autoIncrement.plugin, "Hotel");
const Hotel = mongoose.model("Hotel", hotelSchema);

// // JOI VALIDATION HANDLER
function validateHotel(hotel) {
  const schema = {
    floorNumber: Joi.number()
      .min(1)
      .max(20)
      .required(),
    // hotel_counterId: Joi.required()
  };
  return Joi.validate(hotel, schema);
}

exports.Hotel = Hotel;
exports.validate = validateHotel;
