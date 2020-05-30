import React, { useState } from 'react'
import Tasks from './components/Tasks'
import TaskContextProvider from './contexts/TaskContext'
import Error from './shared/Error'

function App () {
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const showError = (message) => {
    setMessage(message)
    setError(true)
  }

  return !error ? (
    <div className='App'>
      <TaskContextProvider handleError={message => showError(message)}>
        <Tasks handleError={message => showError(message)} />
      </TaskContextProvider>
    </div>
  ) : (
    <Error message={message} />
  )
}

export default App
