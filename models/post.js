'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api');

// Post schema
const postSchema = mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true }
});

// Export
const Post = module.exports = mongoose.model('Post', postSchema);

// Get all artists
module.exports.getPosts = (skip, limit) => {
  // return Post.find();
  return Post.find().skip(skip).limit(limit);
};

// Get one post
module.exports.getPostById = (id) => {
  return Post.findById(id);
};

// Add post
module.exports.addPost = (post) => {
  return Post.create(post);
};

// Edit post
module.exports.editPost = (id, post) => {
  return Post.findOneAndUpdate({_id: id}, post, {new: true});
};

// Remove post
module.exports.removePost = (id) => {
  return Post.findOneAndRemove({_id: id});
};

// Search posts
module.exports.searchPosts = (name) => {
  return Post.find({
    "name": {
      $regex: new RegExp(name,'i')
    }
  });
};

