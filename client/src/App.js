import React from 'react'
import './App.css'
import Tasks from './components/Tasks'
import TaskContextProvider from './contexts/TaskContext'

function App () {
  return (
    <div className='App'>
      <h1> TODO'S </h1>
      <TaskContextProvider>
        <Tasks />
      </TaskContextProvider>
    </div>
  )
}

export default App
