const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv").config()
const port = 5001;

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());

const uri = process.env.MONGO_STRING;

// Connect to MongoDB 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

//Schema for form data
const formDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  schoolCommunity: String,
  additionalInfo: String
});

// Create a model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);

const logFormData = (data) => {
  console.log('Form Data Submitted:');
  console.log(`First Name: ${data.firstName}`);
  console.log(`Last Name: ${data.lastName}`);
  console.log(`Email: ${data.email}`);
  console.log(`School/Community: ${data.schoolCommunity}`);
  console.log(`Additional Info: ${data.additionalInfo}`);
};

// API endpoint to handle form submission
app.post('/api/submit', (req, res) => {
  logFormData(req.body);
  const { firstName, lastName, email, schoolCommunity, additionalInfo } = req.body;

  const formData = new FormData({
    firstName,
    lastName,
    email,
    schoolCommunity,
    additionalInfo
  });

  formData.save()
    .then(result => {
      res.json({
        message: 'Form submitted successfully',
        data: result
      });
    })
    .catch(err => {
      console.log('Error:', err);
      res.status(500).json({ error: err.message });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
