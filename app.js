// Import necessary libraries
const express = require('express')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// Set up express app and middleware
const app = express()
app.use(express.json())

// Define MongoDB schema for jokes
const jokeSchema = new mongoose.Schema({
  text: String,
  type: String
})

// Define API endpoints for moderator actions
app.get('/moderatejokes', authenticateToken, async (req, res) => {
  const jokes = await Joke.find()
  res.json(jokes)
})

app.get('/moderatejokes/:id', authenticateToken, async (req, res) => {
  const joke = await Joke.findById(req.params.id)
  res.json(joke)
})

app.put('/moderatejokes/:id', authenticateToken, async (req, res) => {
  const joke = await Joke.findByIdAndUpdate(req.params.id, req.body)
  res.json(joke)
})

app.put('/moderatejokes/:id/type', authenticateToken, async (req, res) => {
  const joke = await Joke.findByIdAndUpdate(req.params.id, { type: req.body.type })
  res.json(joke)
})

// Define middleware function for authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// Start the server
const port = process.env.PORT || 3000

