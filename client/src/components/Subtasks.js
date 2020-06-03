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

  const sortSubtasks = () => {
    subtasks.sort((a, b) => a.createdAt - b.createdAt)

    subtasks.sort((a, b) => {
      if (a.scheduled > b.scheduled) return 1
      if (b.scheduled > a.scheduled) return -1
      return 0
    })

    subtasks.sort((a, b) => b.priority - a.priority)

    subtasks.sort((a, b) => {
      if (String(a.completed) > String(b.completed)) return 1
      if (String(b.completed) > String(a.completed)) return -1
      return 0
    })

    console.log(subtasks)
  }

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
        // sortSubtasks()
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
        <FontAwesomeIcon className={completedSubtasks.length ? '' : 'disable'} id='timesIcon' icon={faTimes} title='Clear completed tasks' />
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
              return (<SubtaskDetails handleError={handleError} sortSubtasks={sortSubtasks} subtask={subTask} task={task} key={subTask._id} />)
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
