import React, { useContext, useState } from 'react'
import { SubtaskContext } from '../contexts/SubtaskContext'
import SubtaskDetails from './SubtaskDetails'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Subtask = ({ handleError }) => {
  const { task, subtasks, dispatch } = useContext(SubtaskContext)
  const [subtaskName, setSubtaskName] = useState('')

  const completedSubtasks = subtasks.filter(subtask => subtask.completed)

  const handleAddSubtask = async (event) => {
    event.preventDefault()
    if (subtaskName) {
      try {
        const res = await axios({
          method: 'POST',
          url: 'http://localhost:5500/tasks/' + task.taskId + '/subtasks/',
          data: { subTaskName: subtaskName },
          headers: { 'Content-type': 'application/json' }
        })

        dispatch({ type: 'ADD_SUBTASK', newSubtask: res.data.newSubtask })
        dispatch({ type: 'SORT_SUBTASKS' })
        setSubtaskName('')
      } catch (err) {
        handleError('Can\'t add subtask')
      }
    } else {
      event.target.children[0].placeholder = 'Can\'t add empty subtask'
    }
  }

  const handleDeleteCompletedSubtasks = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: 'http://localhost:5500/tasks/' + task.taskId + '/subtasks/'
      })

      dispatch({ type: 'DELETE_COMPLETED_SUBTASKS' })
    } catch (err) {
      handleError('Can\'t delete subtasks')
    }
  }
  return (
    <div className='container'>

      <h2>
        <Link to='/'><FontAwesomeIcon id='backIcon' icon={faArrowCircleLeft} /></Link>
        {task.taskName}
        <FontAwesomeIcon className={completedSubtasks.length ? '' : 'disable'} id='timesIcon' icon={faTimes} title='Clear completed tasks' onClick={handleDeleteCompletedSubtasks} />
      </h2>

      <form onSubmit={handleAddSubtask}>
        <input
          type='text' value={subtaskName} autoFocus placeholder=' Add subtask'
          onChange={(event) => {
            event.target.placeholder = 'Add Subtask'
            setSubtaskName(event.target.value)
          }}
        />
      </form>

      <div className='subtaskList'>
        {subtasks.length ? (
          <div>
            {subtasks.map(subTask => {
              return (<SubtaskDetails handleError={handleError} subtask={subTask} task={task} key={subTask._id} />)
            })}
          </div>
        ) : (
          <p>No Subtask Found</p>
        )}

      </div>

    </div>
  )
}

export default Subtask
