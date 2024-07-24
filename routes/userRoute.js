const express = require('express');
const userRoute = express.Router();
const UserController = require('../controllers/userController');

userRoute.post('/register',  UserController.inscription);
userRoute.post('/login', UserController.connexion);

module.exports = userRoute;