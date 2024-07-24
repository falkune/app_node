const environement = require('dotenv');
environement.config();
const connexion = require('../config/db');

const savePost = (values, callback) => {
    let req = "INSERT INTO posts (titre, description, userId) VALUES (?, ?, ?)";
    connexion.query(req, values, (err, res) => {
        callback(err, res);
    });
}

const getPostById = (id, callback) => {
    let req = "SELECT * FROM posts WHERE id = ?";
    connexion.query(req, [id], (err, res) => {
        callback(err, res);
    });
}

module.exports = {
    savePost,
    getPostById
}