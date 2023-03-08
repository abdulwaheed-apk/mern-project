const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`.green.inverse)
  } catch (error) {
    console.log(error)
    // Exit process with Faliure
    process.exit(1)
  }
}

module.exports = connectDB
