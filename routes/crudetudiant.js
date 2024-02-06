const express = require('express');
const router = express.Router();
const Etudiant = require('../model/etudiant'); // Assurez-vous de mettre le chemin correct

// GET - Récupérer la liste des étudiants
router.get('/', async (req, res) => {
    try {
        const etudiants = await Etudiant.findAll();
        res.json(etudiants);
    } catch (error) {
        console.error('Error retrieving etudiants:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST - Créer un nouvel étudiant
router.post('/', async (req, res) => {
    try {
        const newEtudiant = await Etudiant.create(req.body);
        res.status(201).json(newEtudiant);
    } catch (error) {
        console.error('Error creating etudiant:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PUT - Mettre à jour un étudiant
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updatedRows] = await Etudiant.update(req.body, { where: { id: id } });
        if (updatedRows === 0) {
            res.status(404).json({ message: 'Etudiant not found' });
        } else {
            res.json({ message: 'Etudiant updated successfully' });
        }
    } catch (error) {
        console.error('Error updating etudiant:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE - Supprimer un étudiant
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Etudiant.destroy({ where: { id: id } });
        if (deletedRowCount === 0) {
            res.status(404).json({ message: 'Etudiant not found' });
        } else {
            res.json({ message: 'Etudiant deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting etudiant:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
