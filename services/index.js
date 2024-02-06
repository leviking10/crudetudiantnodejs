const express = require("express");
const cors = require("cors"); // Assurez-vous d'installer le package CORS
const  { sequelize }  = require('../services/config'); // Utilisez directement sequelize sans la destructuration
const app = express();

const port = process.env.PORT || 3000; // Utilisation d'un port dynamique
const etudiantRouter = require("../routes/crudetudiant"); // Mettre à jour le chemin si nécessaire

app.use(cors()); // Utilisation de CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/etudiants", etudiantRouter);

// Middleware pour les routes non trouvées
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

// Synchronisation avec la base de données et démarrage du serveur
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
