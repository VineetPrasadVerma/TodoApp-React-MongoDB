import React, { useContext, useState } from 'react'
import { SubtaskContext } from '../contexts/SubtaskContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPencilAlt,
  faArrowCircleDown
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import SubtaskExtraDetails from './SubtaskExtraDetails'

const SubTaskDetails = ({ task, subtask, handleError }) => {
  const { dispatch } = useContext(SubtaskContext)
  const [showEditInput, setEditInput] = useState(false)
  const [subtaskName, setSubtaskName] = useState(subtask.name)
  const [completed, setCompleted] = useState(subtask.completed)
  const [expandSubtask, setExpandSubtask] = useState(false)

  let color = ''

  if (subtask.priority === 3) {
    color = 'red'
  } else if (subtask.priority === 2) {
    color = 'orange'
  } else if (subtask.priority === 1) {
    color = 'green'
  }

  const handleUpdateSubtask = async (event, id, value) => {
    event.preventDefault()
    // console.log({ [event.target.id]: value })
    const key = event.target.id

    if (subtaskName) {
      try {
        const res = await axios({
          method: 'PUT',
          url: '/tasks/' + task.taskId + '/subtasks/' + id,
          data: { [event.target.id]: value },
          headers: { 'Content-type': 'application/json' }
        })

        dispatch({
          type: 'UPDATE_SUBTASK',
          updatedSubtask: res.data.updatedSubtask
        })

        if (key === 'scheduled' || key === 'priority' || key === 'completed') {
          dispatch({ type: 'SORT_SUBTASKS' })
        }

        setSubtaskName(subtaskName)
        setEditInput(false)
      } catch (err) {
        handleError("Can't update subtask")
      }
    } else {
      event.target.children[0].placeholder = 'Subtask cannot be empty'
    }
  }

  const handleDeleteSubtask = async (id) => {
    try {
      await axios({
        method: 'DELETE',
        url: '/tasks/' + task.taskId + '/subtasks/' + id
      })

      dispatch({ type: 'DELETE_SUBTASK', subtask: { subtaskId: id } })
      dispatch({ type: 'SORT_SUBTASKS' })
    } catch (err) {
      handleError("Can't delete subtask")
    }
  }

  return !showEditInput ? (
    <div className='taskItem'>
      <input
        id='completed'
        type='checkbox'
        checked={completed}
        onChange={(event) => {
          setCompleted(!completed)
          handleUpdateSubtask(event, subtask._id, !completed)
        }}
      />
      <span className={completed ? 'finished' : ''} id='subtaskName'>
        {subtask.name}
      </span>
      <FontAwesomeIcon
        style={{ color: color }}
        className={completed ? 'finished' : ''}
        id='expandIcon'
        icon={faArrowCircleDown}
        onClick={() => setExpandSubtask(!expandSubtask)}
      />
      <FontAwesomeIcon
        className={completed ? 'finished' : ''}
        id='deleteIcon'
        icon={faTrash}
        onClick={() => handleDeleteSubtask(subtask._id)}
      />
      <FontAwesomeIcon
        className={completed ? 'finished' : ''}
        id='editIcon'
        icon={faPencilAlt}
        onClick={() => setEditInput(true)}
      />
      {expandSubtask ? (
        <SubtaskExtraDetails
          subtask={subtask}
          handleUpdateSubtask={handleUpdateSubtask}
          setExpandSubtask={setExpandSubtask}
        />
      ) : (
        ''
      )}
    </div>
  ) : (
    <form
      id='name'
      onSubmit={(event) => handleUpdateSubtask(event, subtask._id, subtaskName)}
    >
      <input
        type='text'
        autoFocus
        value={subtaskName}
        placeholder=' Edit task'
        onChange={(event) => setSubtaskName(event.target.value)}
      />
    </form>
  )
}

export default SubTaskDetails
