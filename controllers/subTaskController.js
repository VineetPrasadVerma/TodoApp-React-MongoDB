const Task = require('../models/tasksModels')

const subTaskQueries = {}

subTaskQueries.getAllSubtask = async (req, res) => {
  try {
    const taskId = req.params.taskid

    const task = await Task.findOne({ _id: taskId })
    if (!task) {
      return res.status(404).json({ message: 'Task doesn\'t exist' })
    }

    const subTasks = task.subTasks
    // if (subTasks.length === 0) {
    //   return res.status(200).json({ task: { taskId, taskName: task.name }, message: 'No subTasks present' })
    // }

    res.status(200).json({ task: { taskId, taskName: task.name }, subTasks })
  } catch (e) {
    res.status(500).json({ message: 'Can\'t get subtasks' })
  }
}

subTaskQueries.createSubtask = async (req, res) => {
  try {
    const taskId = req.params.taskid
    const subTaskName = req.body.subTaskName

    const task = await Task.findOne({ _id: taskId })

    if (!task) {
      return res.status(404).json({ message: 'Task doesn\'t exist' })
    }

    const subTask = {
      name: subTaskName,
      note: ''
    }

    task.subTasks.push(subTask)
    await task.save()

    res.status(201).send({ newSubtask: task.subTasks[task.subTasks.length - 1] })
  } catch (e) {
    res.status(500).json({ message: 'Can\'t add subTask' })
  }
}

subTaskQueries.updateSubtask = async (req, res) => {
  try {
    const taskId = req.params.taskid
    const subTaskId = req.params.subtaskid

    const requestBody = req.body
    const subTaskField = Object.keys(requestBody)[0]
    const subTaskValue = requestBody[subTaskField]

    const task = await Task.findOne({ _id: taskId })

    if (!task) {
      return res.status(404).json({ message: 'Task doesn\'t exist' })
    }

    const index = task.subTasks.findIndex(subtask => subtask.id == subTaskId)

    if (index !== -1) {
      Object.assign(task.subTasks[index], { [subTaskField]: subTaskValue })
      await task.save()
      return res.status(200).send({ message: `Subtask modified with ID: ${subTaskId}` })
    }

    return res.status(404).json({ message: `Can't find subtask with id ${subTaskId}` })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: `Can't update subtask of ${req.params.subtaskid} id` })
  }
}

subTaskQueries.deleteSubtask = async (req, res) => {
  try {
    const taskId = req.params.taskid
    const subTaskId = req.params.subtaskid

    const task = await Task.findOne({ _id: taskId })

    if (!task) {
      return res.status(404).json({ message: 'Subtask doesn\'t exist' })
    }

    const index = task.subTasks.findIndex(subtask => subtask.id == subTaskId)

    if (index !== -1) {
      task.subTasks.splice(index, 1)
      await task.save()
      return res.status(200).send({ message: `Subtask deleted with ID: ${subTaskId}` })
    }

    return res.status(404).json({ message: `Can't find subtask with id ${subTaskId}` })
  } catch (e) {
    res.status(500).json({ message: `Can't delete subtask of id ${req.params.taskId}` })
  }
}

subTaskQueries.deleteCompletedSubtasks = async (req, res) => {
  try {
    const taskId = req.params.taskid

    const task = await Task.findOne({ _id: taskId })

    if (!task) {
      return res.status(404).json({ message: 'Subtask doesn\'t exist' })
    }

    const totalSubtasks = task.subTasks.length
    const filteredSubtasks = task.subTasks.filter(task => task.completed === false)
    task.subTasks = filteredSubtasks

    if (task.subTasks.length === totalSubtasks) return res.status(404).json({ message: 'Don\'t have any completed subtask' })
    await task.save()

    return res.status(200).send({ message: 'Subtasks deleted' })
  } catch (e) {
    res.status(500).json({ message: 'Can\'t delete subtasks ' })
  }
}

module.exports = { subTaskQueries }
