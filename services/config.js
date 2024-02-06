const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://Leviking:Eldorado11@localhost/crudetudiantdb', {
    define: {
        timestamps: false // Désactivez ceci pour tous les modèles
    }
});
module.exports = sequelize;
