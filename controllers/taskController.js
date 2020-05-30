const Task = require('../models/tasksModels')

const taskQueries = {}

taskQueries.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    // if (tasks === []) return res.status(200).json({ taskCount: 0, message: 'No tasks present' })
    return res.status(200).json(tasks)
  } catch (err) {
    res.status(500).json({ taskCount: 0, message: 'Can\'t get tasks' })
  }
}

taskQueries.createTask = async (req, res) => {
  try {
    const taskName = req.body.taskName
    const task = await Task.create({ name: taskName })
    res.status(201).json({ taskId: task._id, name: taskName })
  } catch (e) {
    res.status(500).json({ message: 'Can\'t add Task' })
  }
}

taskQueries.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskid
    const taskName = req.body.taskName

    const task = await Task.findOneAndUpdate({ _id: taskId }, { name: taskName }, { new: true })
    if (!task) {
      return res.status(404).json({ message: `Can't find task with id ${taskId}` })
    }

    res.status(200).json({ message: `Task modified with ID: ${taskId}` })
  } catch (e) {
    res.status(500).json({ message: `Can't update task of ${req.params.id} id` })
  }
}

taskQueries.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskid

    const deletedTask = await Task.findOneAndDelete({ _id: taskId })
    if (!deletedTask) {
      return res.status(404).json({ message: `Can't find task with id ${taskId}` })
    }

    res.status(200).json({ message: `Task deleted with ID: ${taskId}` })
  } catch (e) {
    res.status(500).json({ message: `Can't delete task of ${req.params.id} id` })
  }
}

module.exports = { taskQueries }
