
//SUbmit Jokes Microservice
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/new_jokes', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));

// Set up body-parser middleware
app.use(bodyParser.json());

// Import the jokes routes
const jokesRoutes = require('./routes/jokes');
app.use('/jokes', jokesRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// models/Joke.js

const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  setup: { type: String, required: true },
  punchline: { type: String, required: true },
});

module.exports = mongoose.model('Joke', JokeSchema);
