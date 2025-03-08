const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const studentRoutes = require('./routes/student');  
const verifyToken = require('./middleware/auth'); 

const app = express();


app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use('/api/students/add', verifyToken); 
app.use('/api/students/enroll', verifyToken);  
app.use('/api/students/enrolledCourses', verifyToken); 


app.use('/api/students', studentRoutes);


app.listen(process.env.PORT, () => {
  console.log(`port  ${process.env.PORT}`);
});
