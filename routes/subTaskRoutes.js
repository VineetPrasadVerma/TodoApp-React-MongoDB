const express = require('express')
const router = express.Router({ mergeParams: true })
const { subTaskQueries } = require('../controllers/subTaskController')

// INDEX ROUTE
router.get('/', subTaskQueries.getAllSubtask)

// CREATE ROUTE
router.post('/', subTaskQueries.createSubtask)

// UPDATE ROUTE
router.put('/:subtaskid', subTaskQueries.updateSubtask)

// DELETE ROUTE
router.delete('/:subtaskid', subTaskQueries.deleteSubtask)

// DELETE MORE THAN ONE ROUTE
router.delete('/', subTaskQueries.deleteCompletedSubtasks)

module.exports = router
