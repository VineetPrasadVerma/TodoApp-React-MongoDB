import React, { useContext, useState } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const TaskDetails = ({ task, handleError }) => {
  const { dispatch } = useContext(TaskContext)
  const [showEditInput, setEditInput] = useState(false)
  const [taskName, setTaskName] = useState(task.name)

  const handleUpdateTask = async (event, id) => {
    event.preventDefault()

    if (taskName) {
      try {
        const res = await axios({
          method: 'PUT',
          url: `http://localhost:5500/tasks/${id}`,
          data: { taskName },
          headers: { 'Content-type': 'application/json' }

        })

        dispatch({ type: 'UPDATE_TASK', task: { taskId: id, name: taskName } })
        // setTaskName('')
        setEditInput(false)
      } catch (err) {
        handleError('Can\'t update task')
      }
    } else {
      event.target.children[0].placeholder = 'Taskname cannot be empty'
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `http://localhost:5500/tasks/${id}`
      })

      dispatch({ type: 'DELETE_TASK', task: { taskId: id } })
    } catch (err) {
      handleError('Can\'t delete task')
    }
  }

  return !showEditInput ? (
    <div className='taskItem'>
      <span id='taskName'>{task.name}</span>
      <FontAwesomeIcon id='deleteIcon' icon={faTrash} onClick={() => handleDeleteTask(task._id)} />
      <FontAwesomeIcon id='editIcon' icon={faPencilAlt} onClick={() => setEditInput(true)} />
    </div>
  ) : (
    <form onSubmit={(event) => handleUpdateTask(event, task._id)}>
      <input type='text' autoFocus value={taskName} placeholder=' Edit task' onChange={(event) => setTaskName(event.target.value)} />
    </form>
  )
}

export default TaskDetails
