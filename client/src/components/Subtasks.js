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

        dispatch({ type: 'ADD_SUBTASK', subtasks: res.data.subTasks })
        setSubtaskName('')
      } catch (err) {
        handleError('Can\'t add subtask')
      }
    } else {
      event.target.children[0].placeholder = 'Can\'t add empty subtask'
    }
  }
  return (
    <div className='container'>

      <h2>
        <Link to='/'><FontAwesomeIcon id='backIcon' icon={faArrowCircleLeft} /></Link>
        {task.taskName}
        <FontAwesomeIcon id='timesIcon' icon={faTimes} />
      </h2>

      <form onSubmit={handleAddSubtask}>
        <input type='text' value={subtaskName} autoFocus placeholder=' Add subtask' onChange={(event) => setSubtaskName(event.target.value)} />
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
