const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connecte '))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`port de seveur ${process.env.PORT}`);
});


//mdlware
const verifyToken = require('./middleware/auth');
app.use('/api', verifyToken);

