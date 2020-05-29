import React from 'react'
import Tasks from './components/Tasks'
import TaskContextProvider from './contexts/TaskContext'

function App () {
  return (
    <div className='App'>
      <TaskContextProvider>
        <Tasks />
      </TaskContextProvider>
    </div>
  )
}

export default App
