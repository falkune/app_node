const jwt = require('jsonwebtoken');
const postModel = require('../models/postModel');


const addPost = (request, response) => {
    let { titre, commentaire } = request.body;
    // verifier si le token est inclu dans l'entete de la reque
    let tokenIsInclude = request.headers.authorization;
    if(!tokenIsInclude){
        response.send("le token n'est pas present veuillez vous connecter pour avoir votre token");
        return;
    }

    let transform = tokenIsInclude.split(' ');
    let token = transform[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
        if(err){ // si le token est pas valide ou qu'il soit expire
            response.send("le token n'est pas valide ou il est expire");
            return;
        }
        // si le token est valide on extrait l'id, l'email
        let id = result.userId;
        postModel.savePost([titre, commentaire, id], (e, r) => {
            if(e){
                response.send("erreur lors de l'insertion");
                return;
            }
            response.send({"message":"Commentaire ajoute"});
        });
    })
}

const getPost = (request, response) => {
    let id = request.params.id;
    postModel.getPostById(id, (error, res) => {
        if(error){
            console.log("erreur los de la requete", error);
            return;
        }
        if(res.length == 0){
            response.send({"message":"Aucun commentaire trouve"});
            return;
        }
        response.json(res[0]);
    })
}

module.exports = {
    addPost,
    getPost
}