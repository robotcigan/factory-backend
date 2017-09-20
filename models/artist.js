'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api');

// Artist schema
const artistSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

// Export
const Artist = module.exports = mongoose.model('Artist', artistSchema);

// Get all artists
module.exports.getArtists = (skip, limit) => {
  // return Artist.find();
  return Artist.find().skip(skip).limit(limit);
};

// Get one artist
module.exports.getArtistById = (id) => {
  return Artist.findById(id);
};

// Add artist
module.exports.addArtist = (artist) => {
  return Artist.create(artist);
};

// Edit artist
module.exports.editArtist = (id, artist) => {
  return Artist.findOneAndUpdate({_id: id}, artist, {new: true});
};

// Remove artist
module.exports.removeArtist = (id) => {
  return Artist.findOneAndRemove({_id: id});
};

// Search artists
module.exports.searchArtists = (name) => {
  return Artist.find({
    "name": {
      $regex: new RegExp(name,'i')
    }
  });
};

