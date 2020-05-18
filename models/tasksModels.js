const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subTasks: [
    {
      id: {
        type: Date,
        default: Date.now()
      },
      name: {
        type: String,
        required: true
      },
      scheduled: {
        type: String,
        default: 'null'
      },
      completed: {
        type: Boolean,
        default: false
      },
      priority: {
        type: Number,
        default: 0
      },
      note: {
        type: String
      }
    }
  ]
})

module.exports = mongoose.model('Task', tasksSchema)
