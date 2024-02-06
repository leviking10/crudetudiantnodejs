const Etudiant = require('../model/etudiant'); //le chemin d'accès réel à votre modèle Sequelize
const helper = require('../services/helper');
const config = require('../services/config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const { count, rows } = await Etudiant.findAndCountAll({
        offset,
        limit: config.listPerPage
    });
    const data = helper.emptyOrRows(rows);
    const meta = {page, totalPages: Math.ceil(count / config.listPerPage)};

    return {
        data,
        meta
    }
}

async function create(etudiant){
    try {
        const result = await Etudiant.create(etudiant);
        return { message: 'Etudiant created successfully', result };
    } catch (error) {
        return { message: 'Error in creating etudiant', error };
    }
}

async function update(id, etudiant){
    try {
        await Etudiant.update(etudiant, { where: { id: id } });
        return { message: 'Etudiant updated successfully' };
    } catch (error) {
        return { message: 'Error in updating etudiant', error };
    }
}

async function remove(id){
    try {
        await Etudiant.destroy({ where: { id: id } });
        return { message: 'Etudiant deleted successfully' };
    } catch (error) {
        return { message: 'Error in deleting etudiant', error };
    }
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
};
