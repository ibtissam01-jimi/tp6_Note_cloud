const express = require('express');
const Teacher = require('../model/professeur');
const Course = require('../model/cour');
const verifyToken = require('../middleware/auth');  
const router = express.Router();


router.get('/all', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la recuperation des professeurs', error: err });
  }
});


router.post('/add', verifyToken, async (req, res) => { 
  try {
    const newTeacher = new Teacher(req.body); 
    await newTeacher.save();
    res.status(201).json({ message: 'Professeur ajouté avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l ajout du professeur', error: err });
  }
});


router.post('/assign/:teacher_id/:course_id', verifyToken, async (req, res) => {
  const { teacher_id, course_id } = req.params;
  try {
    const teacher = await Teacher.findById(teacher_id);
    if (!teacher) {
      return res.status(404).json({ message: 'Professeur non trouve' });
    }

    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouve' });
    }

    teacher.courses.push(course_id);  // Ajouter le cours au prof
    await teacher.save();

    res.json({ message: 'Cours attribue ' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l attribution du cours', error: err });
  }
});




router.get('/enrolledStudents/:course_id', verifyToken, async (req, res) => {
  const { course_id } = req.params;
  try {
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouv' });
    }

    const students = await Student.find({ courses: course_id });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la recuperation des etudiants', error: err });
  }
});

module.exports = router;
