const mongoose = require('mongoose');
const { Performance } = require('../models/Performance');
const { Movie } = require('../models/Movie');
const { Book } = require('../models/Book');
const config = require('../config/key');

// mongoose
//   .connect(config.mongoURI, {})
//   .then(() => console.log('mongoDB Connected...'))
//   .catch((err) => console.log(err));

exports.fromDB = async (req, res) => {
  console.log('fromperfo', req.query);
  const findMyPerfo = await Performance.find({
    $and: [{ date: req.query.date }, { email: req.query.user }],
  });
  const findMyMovie = await Movie.find({
    $and: [{ date: req.query.date }, { email: req.query.user }],
  });
  const findMyBook = await Book.find({
    $and: [{ date: req.query.date }, { email: req.query.user }],
  });
  console.log('find3', findMyPerfo, findMyBook, findMyMovie);
  let findMylog = [];
  findMylog.push(findMyPerfo, findMyBook, findMyMovie);
  console.log('findMylog', findMylog);
  res.send(findMylog);
};

exports.fromDBAll = async (req, res) => {
  let findMylog = {};
  const findMyPerfo = await Performance.find({
    $and: [{ email: req.query.user }],
  });

  findMyPerfo.map((perfo) => {
    if (findMylog[perfo.date] == null) findMylog[perfo.date] = {};
    if (findMylog[perfo.date]['perfo'] == null)
      findMylog[perfo.date] = { ...findMylog[perfo.date], perfo: [] };

    findMylog[perfo.date]['perfo'].push(perfo);

    // temp.push(findMylog);
  });

  const findMyMovie = await Movie.find({
    $and: [{ email: req.query.user }],
  });
  findMyMovie.map((movie) => {
    if (findMylog[movie.date] == null) findMylog[movie.date] = {};
    if (findMylog[movie.date]['movie'] == null)
      findMylog[movie.date] = { ...findMylog[movie.date], movie: [] };

    findMylog[movie.date]['movie'].push(movie);
  });
  const findMyBook = await Book.find({
    $and: [{ email: req.query.user }],
  });
  findMyBook.map((book) => {
    if (findMylog[book.date] == null) findMylog[book.date] = {};
    if (findMylog[book.date]['book'] == null)
      findMylog[book.date] = { ...findMylog[book.date], book: [] };

    findMylog[book.date]['book'].push(book);
  });

  // console.log('findMylog', findMylog);
  res.send(findMylog);
};

exports.logOfyear = async (req, res) => {
  // console.log('fromlogofyear', req.query);
  // console.log('fromlogofyear user', req.query.user);
  const findMyPerfo = await Performance.find({
    $and: [{ date: { $regex: req.query.date } }, { email: req.query.user }],
  });
  const findMyMovie = await Movie.find({
    $and: [{ date: { $regex: req.query.date } }, { email: req.query.user }],
  });
  const findMyBook = await Book.find({
    $and: [{ date: { $regex: req.query.date } }, { email: req.query.user }],
  });
  let findLogOfYear = [];
  findLogOfYear.push(findMyPerfo, findMyBook, findMyMovie);
  // console.log('findLogOfYear', findLogOfYear);
  res.send(findLogOfYear);
};

exports.DBAll = async (req, res) => {
  const findMyPerfo = await Performance.find();
  const findMyMovie = await Movie.find();
  const findMyBook = await Book.find();
  let AllOfYear = [];
  AllOfYear.push(findMyPerfo, findMyBook, findMyMovie);
  res.send(AllOfYear);
};

exports.DBdelete = async (req, res) => {

  console.log('DBdelete', req.query);
  if (req.query.category === '공연') {
    Performance.deleteOne(req.query._id, function (err, result) {
      res.status(200).send('성공');
    });
  } else if (req.query.category === '책') {
    Book.deleteOne(req.query._id, function (err, result) {
      res.status(200).send('성공');
    });
  } else if (req.query.category === '영화') {
    Movie.deleteOne(req.query._id, function (err, result) {
      res.status(200).send('성공');
    });
  }

};
