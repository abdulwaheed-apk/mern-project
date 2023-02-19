const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

const port = process.env.PORT || 5000

connectDB()

const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()
app.get('/', (req, res) => {
  res.send('Hello Check Me')
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalsRoute'))

app.use(errorHandler)
app.listen(port, () =>
  console.log(
    `Server Running at port http://localhost:${port}`.magenta.underline.inverse
  )
)
