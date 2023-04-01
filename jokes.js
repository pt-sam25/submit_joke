// routes/jokes.js

const express = require('express');
const router = express.Router();
const Joke = require('../models/Joke');

// Route for submitting a new joke
router.post('/', async (req, res) => {
  try {
    const joke = new Joke({
      type: req.body.type,
      setup: req.body.setup,
      punchline: req.body.punchline,
    });
    await joke.save();
    res.status(201).json(joke);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
