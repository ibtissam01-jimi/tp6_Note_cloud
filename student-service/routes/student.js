const express = require('express');
const Student = require('../model/etudiant');
const verifyToken = require('../middleware/auth');  
const router = express.Router();


router.get('/all', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des étudiants', error: err });
  }
});


//avec token
router.post('/add', verifyToken, async (req, res) => {  
  try {
    const newStudent = new Student(req.body); 
    await newStudent.save();
    res.status(201).json({ message: 'etudiant ajouté avec succes' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l ajout de l étudiant', error: err });
  }
});










router.post('/enroll/:student_id/:course_id', verifyToken, async (req, res) => {
  const { student_id, course_id } = req.params;
  try {
    // Verifier est ce que cours disponsibl
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouve' });
    }

    const student = await Student.findById(student_id);
    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouve' });
    }

    student.courses.push(course_id);  
    await student.save();

    res.json({ message: 'Étudiant inscrit au cours avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l inscription à un cours', error: err });
  }
});




router.get('/enrolledCourses/:student_id', verifyToken, async (req, res) => {
  const { student_id } = req.params;
  try {
    const student = await Student.findById(student_id).populate('courses');
    if (!student) {
      return res.status(404).json({ message: 'etudiant non trouve' });
    }
    res.json(student.courses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la recuperation des cours de etudiant', error: err });
  }
});

module.exports = router;
