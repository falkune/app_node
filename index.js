const express = require('express'); // importation du module express
const cors = require('cors'); // importation du module cors
const UserRoute = require('./routes/userRoute');
const PostRoute = require('./routes/postRoute');

// instance de l'application (le serveur) la variable app peut etre appelée n'importe comment
const app = express(); 

app.use(express.json());
app.use(cors()); // utilisation du module cors par le serveur

app.use('/user', UserRoute);
app.use('/post', PostRoute);



// initialisation du serveur
app.listen(3000, () => {
    console.log("Serveur en marche sur le port : 3000");
});
