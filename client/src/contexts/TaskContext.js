import React, { createContext, useReducer, useEffect } from 'react'
import { taskReducer } from '../reducers/TaskReducer'
import axios from 'axios'

export const TaskContext = createContext()

const TaskContextProvider = (props) => {
  const [tasks, dispatch] = useReducer(taskReducer, [])

  useEffect(() => {
    axios.get('http://localhost:5500/tasks/').then(res =>
      dispatch({ type: 'GET_TASK', tasks: res.data })
    ).catch(

    )
  }, [])

  console.log(tasks)
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskContextProvider
