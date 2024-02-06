const { DataTypes } = require('sequelize');
const sequelize = require('../services/config'); // Importez Sequelize depuis votre fichier config

const Etudiant = sequelize.define('etudiant', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    classe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Etudiant;
