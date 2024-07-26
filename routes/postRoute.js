const express = require('express');
const PostRoute = express.Router();
const postController = require('../controllers/postController');

PostRoute.post('/add',  postController.addPost);
PostRoute.get('/getpost/:id', postController.getPost);
PostRoute.get('/getAll', postController.getAllPosts);
PostRoute.get('/delete', postController.deletePost);
PostRoute.post('/update', postController.updatePost);

module.exports = PostRoute;