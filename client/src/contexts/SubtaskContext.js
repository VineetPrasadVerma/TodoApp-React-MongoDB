import React, { useEffect, useReducer, createContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { subtaskReducer } from '../reducers/SubtaskReducer'

export const SubtaskContext = createContext()

const SubtaskContextProvider = (props) => {
  const [subtasks, dispatch] = useReducer(subtaskReducer, [])
  const [task, setTask] = useState({})
  const { taskid } = useParams()

  useEffect(() => {
    // axios.get(`http://localhost:5500/tasks/${taskid}/subtasks/`).then(res => {
    //   dispatch({ type: 'SET_SUBTASK', subtasks: res.data.subTasks })
    //   dispatch({ type: 'SORT_SUBTASKS' })
    //   setTask(res.data.task)
    // }
    // ).catch(() => { props.handleError('Can\'t get subtask') })

    const fetchSubtasks = async () => {
      try {
        const res = await axios.get(`/tasks/${taskid}/subtasks/`)
        dispatch({ type: 'SET_SUBTASK', subtasks: res.data.subTasks })
        dispatch({ type: 'SORT_SUBTASKS' })
        setTask(res.data.task)
      } catch (err) {
        props.handleError('Can\'t get subtask')
      }
    }

    fetchSubtasks()
  }, [])

  return (
    <SubtaskContext.Provider value={{ task, subtasks, dispatch }}>
      {props.children}
    </SubtaskContext.Provider>
  )
}

export default SubtaskContextProvider
