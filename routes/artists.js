'use strict';

const express = require('express');
const router = express.Router();

const Artist = require('../models/artist');

router.get('/', (req, res) => {
  res.send('Hello world');
});

// All aritsts with pagination parameters
router.get('/artists', (req, res) => {
  let skip = 5;
  let limit = 5;
  let page = req.param('page');
  Artist.getArtists(page * skip, limit)
    .then(artists => {
      res.send({ artists: artists});
    })
    .catch(err => next(err));
});

// One artist
router.get('/artist/:id', (req, res) => {
  Artist.getArtistById(req.params.id)
    .then(artist => {
      res.send({ artist: artist });
    })
    .catch(err => next(err));
});

// Adding artist
router.post('/artist', (req, res) => {
  Artist.addArtist(req.body)
    .then(artist => {
      res.send({ artist: artist});
      console.log('artist was successfully created');
    })
    .catch(err => next(err));
});

// Edit artist
router.put('/artist/:id', (req, res) => {
  Artist.editArtist(req.params.id, req.body)
    .then(artist => {
      res.send({ artist: artist });
      console.log('artist was successfully updated');
    })
    .catch(err => next(err));
});

// Removing artist
router.delete('/artist/:id', (req, res) => {
  Artist.removeArtist(req.params.id)
    .then(() => {
      res.send(200);
      console.log('artist was successfully removed');
    })
    .catch(err => next(err));
});

// Searching artists
router.get('/artist/search/:name', (req, res) => {
  Artist.searchArtists(req.params.name)
    .then(artists => {
      res.send({ artists: artists });
    })
    .catch(err => next(err));
});

module.exports = router;
