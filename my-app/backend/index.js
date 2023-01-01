require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Message = require('./models/message')

app.use(express.json())

app.use(cors())

app.get('/api/messages', (request, response, next) => {
  Message.find({}).then(messages => {
    response.json(messages)
  }).catch(error => next(error))
})

app.post('/api/messages', (request, response, next) => {
  const message = { ...request.body }

  const newObj = new Message({
    name: message.name,
    content: message.content
  })
  newObj.save().then((msgSaved) => {
    response.json(msgSaved)
  }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.message.includes('duplicate key error collection')) {
    return response.status(400).json({ error: 'must be unique' })
  }

  next(error)

}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})