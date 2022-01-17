const Joi = require("joi");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const connection = mongoose.createConnection("mongodb://localhost/vidly");

autoIncrement.initialize(connection);

const hotel_counterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  myId: Number
});

hotel_counterSchema.plugin(autoIncrement.plugin, {
  model: "Hotel_Counter",
  field: "myId",
  startAt: 1
});
const Hotel_Counter = mongoose.model("Hotel_Counter", hotel_counterSchema);

// JOI VALIDATION HANDLER
function validateHotel_Counter(hotel_counter) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(20)
      .required()
  };
  return Joi.validate(hotel_counter, schema);
}

exports.Hotel_Counter = Hotel_Counter;
exports.hotel_counterSchema = hotel_counterSchema;
exports.validate = validateHotel_Counter;
