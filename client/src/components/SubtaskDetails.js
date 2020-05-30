import React, { useContext, useState } from 'react'
import { SubtaskContext } from '../contexts/SubtaskContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const SubTaskDetails = ({ task, subtask, handleError }) => {
  const { dispatch } = useContext(SubtaskContext)
  const [showEditInput, setEditInput] = useState(false)
  const [subtaskName, setSubtaskName] = useState(subtask.name)

  const handleUpdateSubtask = async (event, id) => {
    event.preventDefault()

    if (subtaskName) {
      try {
        await axios({
          method: 'PUT',
          url: 'http://localhost:5500/tasks/' + task.taskId + '/subtasks/' + id,
          data: { name: subtaskName },
          headers: { 'Content-type': 'application/json' }

        })

        dispatch({ type: 'UPDATE_SUBTASK', subtask: { subtaskId: id, subtaskName } })
        setSubtaskName(subtaskName)
        setEditInput(false)
      } catch (err) {
        handleError('Can\'t update subtask')
      }
    } else {
      event.target.children[0].placeholder = 'Subtask cannot be empty'
    }
  }

  const handleDeleteSubtask = async (id) => {
    try {
      await axios({
        method: 'DELETE',
        url: 'http://localhost:5500/tasks/' + task.taskId + '/subtasks/' + id
      })

      dispatch({ type: 'DELETE_SUBTASK', subtask: { subtaskId: id } })
    } catch (err) {
      handleError('Can\'t delete subtask')
    }
  }

  return !showEditInput ? (
    <div className='taskItem'>
      <span id='subtaskName'>{subtask.name}</span>
      <FontAwesomeIcon id='expandIcon' icon={faArrowCircleDown} onClick={() => setEditInput(true)} />
      <FontAwesomeIcon id='deleteIcon' icon={faTrash} onClick={() => handleDeleteSubtask(subtask._id)} />
      <FontAwesomeIcon id='editIcon' icon={faPencilAlt} onClick={() => setEditInput(true)} />
    </div>
  ) : (
    <form onSubmit={(event) => handleUpdateSubtask(event, subtask._id)}>
      <input type='text' autoFocus value={subtaskName} placeholder=' Edit task' onChange={(event) => setSubtaskName(event.target.value)} />
    </form>
  )
}

export default SubTaskDetails
