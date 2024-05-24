

//movieSchema.js

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  linkOne: {
    type: String,
    required: true
  },
  linkTwo: {
    type: String,
    required: true
  },
  linkThree: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

