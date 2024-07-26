const environement = require('dotenv');
environement.config();
const connexion = require('../config/db');
// sauvegarder un post
const savePost = (values, callback) => {
    let req = "INSERT INTO posts (titre, description, userId) VALUES (?, ?, ?)";
    connexion.query(req, values, (err, res) => {
        callback(err, res);
    });
}
// recuperer un post via son id
const getPostById = (id, callback) => {
    let req = "SELECT users.nom, users.prenom, posts.titre, posts.description, posts.id FROM users INNER JOIN posts  ON users.id = posts.userID WHERE posts.id = ?";
    connexion.query(req, [id], (err, res) => {
        callback(err, res);
    });
}

// recuperer la liste des posts
const getAllPosts = (callback) => {
    let req = "SELECT * FROM posts";
    connexion.query(req, (err, res) => {
        callback(err, res);
    });
}

// methode pour supprimer un post
const deletePost = (id, callback) => {
    let sql = "DELETE FROM posts WHERE id = ?";
    connexion.query(sql, [id], (err, res) => {
        callback(err, res);
    })
}

// methode pour modifier un post
const updatePost = (values, callback) => {
    let sql = "UPDATE posts SET titre = ?, description = ? WHERE id = ?";
    connexion.query(sql, values, (err, res) => {
        callback(err, res);
    })
}

// recuperation de la liste des posts d'un utilisateur
const getUserPost = (id, callback) => {
    let sql = "SELECT * FROM posts WHERE userId = ?";
    connexion.query(sql, id, (err, res) => {
        callback(err, res);
    })
}

module.exports = {
    savePost,
    getPostById,
    getAllPosts,
    deletePost,
    updatePost,
    getUserPost
}