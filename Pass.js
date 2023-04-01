// Import necessary libraries
const express = require('express')
const axios = require('axios')

// Set up express app and middleware
const app = express()
app.use(express.json())

// Define API endpoint to retrieve and submit jokes
app.get('/moderatejokes', async (req, res) => {
  try {
    // Call the "Submit Jokes" API to get a new joke
    const jokeResponse = await axios.get('https://submitjokesapi.azurewebsites.net/api/jokes')
    
    // Validate the response
    const jokeData = jokeResponse.data
    if (!jokeData.id || !jokeData.joke) {
      throw new Error('Invalid joke data returned from "Submit Jokes" API')
    }
    
    // Submit the joke to the "Submit Jokes" API
    await axios.post('https://submitjokesapi.azurewebsites.net/api/jokes', jokeData)

    // Delete the joke from the "Submit Jokes" API
    await axios.delete(`https://submitjokesapi.azurewebsites.net/api/jokes/${jokeData.id}`)
    
    // Return the retrieved joke as the response
    res.send(jokeData)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving and submitting joke')
  }
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
