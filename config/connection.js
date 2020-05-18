const mongoose = require('mongoose')

const URI = process.env.DATABASE_URL

const connectDB = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
