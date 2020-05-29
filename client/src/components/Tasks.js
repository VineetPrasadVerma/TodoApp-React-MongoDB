import React, { useContext, useState } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import TaskDetails from './TaskDetails'
import e from 'express'

const Tasks = () => {
  const [taskName, setTaskName] = useState('')
  const { tasks, dispatch } = useContext(TaskContext)

  const handleSubmit = () => {
    e.preventDefault()
  }
  return tasks.length ? (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder=' Search | Add Tasks' onChange={(event) => setTaskName(event.target.value)} />
      </form>
      <div className='taskList'>
        {tasks.map(task => {
          return (<TaskDetails task={task} key={task._id} />)
        })}
      </div>
    </div>
  ) : (
    <p> </p>
  )
}

export default Tasks
