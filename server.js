const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const uri = 'mongodb://root:example@mongodb:27017/admin';

mongoose.connect(uri);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    await newUser.save();
    res.send('User registered successfully');
  } catch (err) {
    console.error(`Error saving user: ${err.message}`);
    res.status(500).send(`Error saving user: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
