const express = require('express');
const PostRoute = express.Router();
const postContoller = require('../controllers/postController');

PostRoute.post('/add',  postContoller.addPost);
PostRoute.get('/getpost/:id', postContoller.getPost);

module.exports = PostRoute;