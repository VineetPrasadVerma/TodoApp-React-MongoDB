const express = require('express')
const router = express.Router()
const { taskQueries } = require('../controllers/taskController')

// INDEX ROUTE
router.get('/', taskQueries.getAllTasks)

// CREATE ROUTE
router.post('/', taskQueries.createTask)

// UPDATE ROUTE
router.put('/:taskid', taskQueries.updateTask)

// DELETE ROUTE
router.delete('/:taskid', taskQueries.deleteTask)

module.exports = router
