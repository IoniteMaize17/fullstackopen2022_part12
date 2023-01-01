const mongoose = require('mongoose')

const url = process.env.MONGO_URL
console.log(url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    required: true
  },
  content: {
    type: String,
    minLength: 1,
    required: true
  },
})

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('messages', messageSchema)