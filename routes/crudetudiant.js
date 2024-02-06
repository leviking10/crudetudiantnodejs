// routes/crudetudiant.js
const express = require('express');
const router = express.Router();
const etudiantService = require('../services/crudetudiant'); // Assurez-vous que le chemin d'accès est correct

// GET - Récupérer la liste des étudiants
router.get('/', async (req, res) => {
    try {
        const { data, meta } = await etudiantService.getEtudiants(1); // Ajoutez la gestion de la pagination si nécessaire
        res.json({ data, meta });
    } catch (error) {
        console.error('Error retrieving etudiants:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST - Créer un nouvel étudiant
router.post('/', async (req, res) => {
    try {
        const { message, result } = await etudiantService.create(req.body);
        res.status(201).json({ message, result });
    } catch (error) {
        console.error('Error creating etudiant:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PUT - Mettre à jour un étudiant
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { message } = await etudiantService.update(id, req.body);
        res.json({ message });
    } catch (error) {
        console.error('Error updating etudiant:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE - Supprimer un étudiant
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { message } = await etudiantService.remove(id);
        res.json({ message });
    } catch (error) {
        console.error('Error deleting etudiant:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
