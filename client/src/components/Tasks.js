import React, { useContext, useState } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import TaskDetails from './TaskDetails'
import axios from 'axios'

const Tasks = () => {
  const [taskName, setTaskName] = useState('')
  const { tasks, dispatch } = useContext(TaskContext)

  const handleAddTask = async (e) => {
    e.preventDefault()

    const res = await axios({
      method: 'POST',
      url: 'http://localhost:5500/tasks/',
      data: { taskName },
      headers: { 'Content-type': 'application/json' }
    })

    if (res) {
      dispatch({ type: 'ADD_TASK', task: { taskId: res.data.taskId, name: res.data.name } })
      setTaskName('')
    }
  }

  return tasks.length ? (
    <div className='container'>

      <h1> TODO'S </h1>

      <form onSubmit={handleAddTask}>
        <input type='text' value={taskName} placeholder=' Search | Add Tasks' onChange={(event) => setTaskName(event.target.value)} />
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
