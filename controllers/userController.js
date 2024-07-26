const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const inscription = async (request, response) => {
    // récupération des données
    let { nom, prenom, email, password } = request.body;

    if(nom == "" || prenom == "" || email == "" || password == ""){
        response.send({message: "Veuillez remplir tous les champs"});
        return;
    }
    // crypter le mot de passe
    const hashedPassword = await bcrypt.hash(password, 5);

    let values = [nom, prenom, email, hashedPassword];
    // appel de la méthode saveUser définie dans le userModel
    userModel.saveUser(values, (err, result) => {
        if(err){
            response.send({message: "erreur lors de l'insertion"}); 
            return;
        }
        // response.send("Inscription realisee", res.insertId); probleme
        response.send({ message: "Inscription réalisée", id: result.insertId });
    });
}

// 
const connexion = (request, response) => {
    // récupération des données
    let {email, password} = request.body;

    userModel.login(email, async(err, result) => {
        if(err){
            response.status(500).send({messag: "erreur interne au serveur"}); 
            return;
        }
        if(result.length != 0){
            let user = result[0];
            let passwordIsValid = await bcrypt.compare(password, user.password);
            // 
            if(!passwordIsValid){
                response.status(404).send({message: "email ou mot de passe incorreect"});
                return;
            }
            // generation du token
            let token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );
            response.send({message: "salut", data: token});
        }else{
            response.status(404).send({message: "email ou mot de passe incorreect"});
        }
    });    
}


module.exports = {
    inscription,
    connexion
};
