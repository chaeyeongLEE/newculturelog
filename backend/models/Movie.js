const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = mongoose.Schema({
  email: {
    type: String,
  },
  date: {
    type: String,
  },
  title: {
    type: String,
  },
  director: {
    type: String,
  },
  actor: {
    type: String,
  },
  review: {
    type: String,
  },
});
const Movie = mongoose.model('Movie', movieSchema);
module.exports = { Movie };
