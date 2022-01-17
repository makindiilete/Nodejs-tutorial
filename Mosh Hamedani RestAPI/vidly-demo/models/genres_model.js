const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  author: {
    type: String,
    required: true,
    minlength: 5
  }
});

const Genre = mongoose.model("Genre", genreSchema);

// JOI VALIDATION HANDLER
function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required(),
    author: Joi.string()
      .min(5)
      .required()
  };
  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;
