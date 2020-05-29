import React, { useContext } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const TaskDetails = ({ task }) => {
  const { dispatch } = useContext(TaskContext)

  const handleDeleteTask = async (id) => {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:5500/tasks/${id}`
    })

    if (res) {
      dispatch({ type: 'DELETE_TASK', task: { taskId: id } })
    }
  }

  return (
    <div>{task.name} <FontAwesomeIcon icon={faPencilAlt} /> <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteTask(task._id)} /></div>
  )
}

export default TaskDetails
