'use strict';

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const moment = require('moment');

const Post = require('../models/post');

let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    const timestamp = Date.now();
    file.timestamp = timestamp;
    cb(null, timestamp + file.originalname);
  }
});

let upload = multer({ storage: storage });

// All posts with pagination parameters
router.get('/posts', (req, res) => {
  let skip = 0;
  let limit = 0;
  let page = req.param('page');
  Post.getPosts(page * skip, limit)
    .then(posts => {
      res.send({ posts: posts});
    })
    .catch(err => next(err));
});

// One post
router.get('/posts/:id', (req, res) => {
  Post.getPostById(req.params.id)
    .then(post => {
      res.send({ post: post });
    })
    .catch(err => next(err));
});

// Adding post
router.post('/post', (req, res) => {
  req.body.date = moment().format();
  Post.addPost(req.body)
    .then(post => {
      res.send({ post: post });
      // moment().lang('ru').format('DD.MM.YYYY, LL');
      console.log('post was successfully created');
    })
    .catch(err => next(err));
});

router.post('/upload', upload.single('file'), (req, res, next) => {
  res.send('done');
});

// Edit post
router.put('/post/:id', (req, res) => {
  Post.editPost(req.params.id, req.body)
    .then(post => {
      res.send({ post: post });
      console.log('post was successfully updated');
    })
    .catch(err => next(err));
});

// Removing post
router.delete('/post/:id', (req, res) => {
  Post.removePost(req.params.id)
    .then(() => {
      res.send(200);
      console.log('post was successfully removed');
    })
    .catch(err => next(err));
});

// Searching posts
router.get('/post/search/:name', (req, res) => {
  Post.searchPost(req.params.name)
    .then(posts => {
      res.send({ posts: posts });
    })
    .catch(err => next(err));
});

module.exports = router;
