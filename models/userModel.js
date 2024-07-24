const environement = require('dotenv');
environement.config();
const connexion = require('../config/db');

// enregistrer un user
const saveUser = (values, callback) => {
    let req = `INSERT INTO users (nom, prenom, email, password) VALUES (?,?,?,?)`;
    connexion.query(req, values, (err, res) => {
        callback(err, res)
    });
}
// connecter un user
const login = (email, callback) => {
    let sql = "SELECT * FROM users WHERE email = ?";
    connexion.query(sql, [email], (err, res) => {
        callback(err, res)
    });
}

module.exports = {
    saveUser,
    login
};