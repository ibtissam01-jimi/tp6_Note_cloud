
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const courseRoutes = require('./routes/cours'); 

const app = express();


app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// applique de mdlware sur routes
const verifyToken = require('../auth-service/middleware/auth');
app.use('/api/courses/update', verifyToken); 
app.use('/api/courses/delete', verifyToken); 
app.use('/api/courses/profile', verifyToken); 


//ajouter et all
app.use('/api/courses', courseRoutes);


app.listen(process.env.PORT, () => {
  console.log(`port de serveur ${process.env.PORT}`);
});
