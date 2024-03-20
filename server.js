
const express = require('express');
const errorHanler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();


connectDB()
const app= express();

const port = process.env.PORT || 5000

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHanler)

app.listen(port , ()=>{
})

