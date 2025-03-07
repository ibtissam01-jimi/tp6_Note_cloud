const mongoose = require('mongoose');

const professeurSchema = new mongoose.Schema({
  name: String,
  bio: String,
  cours: [String]
});

module.exports = mongoose.model('Professeur', professeurSchema);
