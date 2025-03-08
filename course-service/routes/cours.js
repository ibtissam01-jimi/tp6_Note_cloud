
const express = require('express');
const Course = require('../model/cour');
const router = express.Router();


router.get('/all', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cours', error: err });
  }
});




router.post('/add', async (req, res) => {
  try {
    const newCourse = new Course(req.body); 
    await newCourse.save();
    res.status(201).json({ message: 'Cours ajouté avec succès'});
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors d ajout du cours', error: err });
  }
});





router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Cours non trouve' });
    }
    res.json({ message: 'Cours mis a jour avec succes'});
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise a jour ', error: err });
  }
});




router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Cours non trouve' });
    }
    res.json({ message: 'Cours supprime ' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression ', error: err });
  }
});




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
