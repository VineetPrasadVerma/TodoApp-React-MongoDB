import React, { useContext, useState, useEffect } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import TaskDetails from './TaskDetails'
import axios from 'axios'

const Tasks = ({ handleError }) => {
  const { tasks, dispatch } = useContext(TaskContext)

  const [taskName, setTaskName] = useState('')
  const [searchedTasks, setSearchedTasks] = useState([])

  useEffect(() => {
    setSearchedTasks(tasks)
  }, [tasks])

  const handleSearchTask = (event) => {
    event.target.placeholder = ' Search | Add Task'
    setTaskName(event.target.value)
    setSearchedTasks(
      tasks.filter((task) =>
        task.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
    // dispatch({ type: 'GET_TASK', tasks: searchedTasks })
  }

  const handleAddTask = async (event) => {
    event.preventDefault()

    if (taskName) {
      try {
        const res = await axios({
          method: 'POST',
          url: 'tasks/',
          data: { taskName },
          headers: { 'Content-type': 'application/json' }
        })

        dispatch({
          type: 'ADD_TASK',
          task: { taskId: res.data.taskId, name: res.data.name }
        })
        setTaskName('')
      } catch (err) {
        handleError("Can't add task")
      }
    } else {
      event.target.children[0].placeholder = "Can't add empty task"
    }
  }

  return (
    <div className='container'>
      <h1> TODO'S </h1>

      <form onSubmit={handleAddTask}>
        <input
          type='text'
          value={taskName}
          autoFocus
          placeholder=' Search | Add Task'
          onChange={(event) => handleSearchTask(event)}
        />
      </form>

      <div className='taskList'>
        {searchedTasks.length ? (
          <div>
            {searchedTasks.map((task) => {
              return (
                <TaskDetails
                  handleError={handleError}
                  task={task}
                  key={task._id}
                />
              )
            })}
          </div>
        ) : (
          <p>No Task Found</p>
        )}
      </div>
    </div>
  )
}

export default Tasks
