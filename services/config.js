const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://Leviking:Eldorado11@localhost/crudetudiantdb', {
    define: {
        timestamps: false
    }
});
const appConfig = {
    listPerPage: 10
};
module.exports =  { sequelize, appConfig };

