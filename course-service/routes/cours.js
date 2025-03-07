// routes/course.js
const express = require('express');
const Course = require('../model/cour');
const router = express.Router();

// a. Récupérer tous les cours
router.get('/all', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cours', error: err });
  }
});

// b. Ajouter un nouveau cours
router.post('/add', async (req, res) => {
  try {
    const newCourse = new Course(req.body); // Pas de validation des champs
    await newCourse.save();
    res.status(201).json({ message: 'Cours ajouté avec succès'});
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors d ajout du cours', error: err });
  }
});

// c. Mettre à jour un cours existant
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    res.json({ message: 'Cours mis à jour avec succès'});
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du cours', error: err });
  }
});

// d. Supprimer un cours
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    res.json({ message: 'Cours supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du cours', error: err });
  }
});

// e. Rechercher des cours en fonction d'un terme clé
router.get('/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    const courses = await Course.find({
      $or: [
        { titre: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la recherche de cours', error: err });
  }
});

module.exports = router;
