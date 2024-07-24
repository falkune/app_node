const db = require('mysql2');

const connexion = db.createConnection({
    host      : process.env.DB_HOST,
    database  : process.env.DATABASE,
    port      : process.env.DB_PORT,
    user      : process.env.DB_USER,
    password  : process.env.DB_PASSWORD
});

connexion.connect((error) => {
    if(error){
        console.log("erreur connexion avec la base de donnees", error);
        return;
    }
    console.log("connexion avec la base de donnees etablie...");
});

module.exports = connexion;