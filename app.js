require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connection')
const taskRoutes = require('./routes/taskRoutes')
const subTaskRoutes = require('./routes/subTaskRoutes')

connectDB()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/tasks', taskRoutes)
app.use('/tasks/:taskid/subtasks', subTaskRoutes)

app.listen(process.env.APP_PORT, () => console.log(`Todo server has started on PORT ${process.env.APP_PORT}`))
