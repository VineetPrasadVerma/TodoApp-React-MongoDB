import React, { useContext } from 'react'
import { TaskContext } from '../contexts/TaskContext'

const TaskDetails = ({ task }) => {
  const dispatch = useContext(TaskContext)

  return (
    <div>{task.name}</div>
  )
}

export default TaskDetails
