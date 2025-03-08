const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const teacherRoutes = require('./routes/professeur'); 
const verifyToken = require('./middleware/auth'); 

const app = express();


app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use('/api/teachers/assign', verifyToken);  
app.use('/api/teachers/enrolledStudents', verifyToken);  



app.use('/api/teachers', teacherRoutes);


app.listen(process.env.PORT, () => {
  console.log(`port ${process.env.PORT}`);
});
