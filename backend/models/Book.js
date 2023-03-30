const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = mongoose.Schema({
  email: {
    type: String,
  },
  date: {
    type: String,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
  review: {
    type: String,
  },
});
const Book = mongoose.model('Book', bookSchema);
module.exports = { Book };
