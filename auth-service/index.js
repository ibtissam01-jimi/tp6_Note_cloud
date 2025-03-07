const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Importer les routes
app.use('/api', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`port de serveur ${process.env.PORT}`);
});
