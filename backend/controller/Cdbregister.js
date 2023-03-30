const mongoose = require('mongoose');
const { Performance } = require('../models/Performance');
const { Movie } = require('../models/Movie');
const { Book } = require('../models/Book');
const config = require('../config/key');

// mongoose
//   .connect(config.mongoURI, {})
//   .then(() => console.log('mongoDB Connected...'))
//   .catch((err) => console.log(err));

exports.PerfoDB = (req, res) => {
  console.log('perfo', req.body);
  const perfo_board = new Performance(req.body);
  perfo_board.save((err, perfoInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
};

exports.MovieDB = (req, res) => {
  console.log('movie', req.body);
  const movie_board = new Movie(req.body);
  movie_board.save((err, movieInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
};

exports.BookDB = (req, res) => {
  console.log('book', req.body);
  const book_board = new Book(req.body);
  book_board.save((err, bookInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
};
