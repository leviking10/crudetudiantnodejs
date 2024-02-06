const Etudiant = require('../model/etudiant'); // Assurez-vous que le chemin d'accès au modèle est correct
const helper = require('../services/helper');
const  { sequelize }  = require('../services/config');

async function getEtudiants(page = 1) {
    // Accès direct à listPerPage à partir de l'instance sequelize
    const listPerPage = sequelize.options.define.listPerPage || 10; // Utilisation d'une valeur par défaut si non définie

    const offset = helper.getOffset(page, listPerPage);
    const { count, rows } = await Etudiant.findAndCountAll({
        offset,
        limit: listPerPage
    });
    const data = helper.emptyOrRows(rows);
    const meta = { page, totalPages: Math.ceil(count / listPerPage) };

    return {
        data,
        meta
    };
}
async function create(etudiant) {
    try {
        const result = await Etudiant.create(etudiant);
        return { message: 'Etudiant created successfully', result };
    } catch (error) {
        return { message: 'Error in creating etudiant', error };
    }
}

async function update(id, etudiant) {
    try {
        await Etudiant.update(etudiant, {
            where: { id: id } });
        return { message: 'Etudiant updated successfully' };
    } catch (error) {
        return { message: 'Error in updating etudiant', error };
    }
}

async function remove(id) {
    try {
        await Etudiant.destroy({ where: { id: id } });
        return { message: 'Etudiant deleted successfully' };
    } catch (error) {
        return { message: 'Error in deleting etudiant', error };
    }
}

module.exports = {
    getEtudiants,
    create,
    update,
    remove
};
