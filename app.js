require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/connection')
const taskRoutes = require('./routes/taskRoutes')
const subTaskRoutes = require('./routes/subTaskRoutes')

connectDB()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/tasks', taskRoutes)
app.use('/tasks/:taskid/subtasks', subTaskRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
  })
}

app.listen(process.env.PORT, () =>
  console.log(`Todo server has started on PORT ${process.env.PORT}`)
)
