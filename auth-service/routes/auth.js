const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/utilisateur');
const verifyToken = require('../middleware/auth');
const router = express.Router();

//a)_register 
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    res.json({ message: "Utilisateur enregistre" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de enregistement", error: err });
  }
});

// b)_login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Utilisateur non trouve" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); 
  res.json({ token });
});

// c)_profile
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: "Profil utilisateur", user: req.user });
});

module.exports = router;
