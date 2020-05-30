import React, { useState } from 'react'
import Tasks from './components/Tasks'
import TaskContextProvider from './contexts/TaskContext'
import Error from './shared/Error'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App () {
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const showError = (message) => {
    setMessage(message)
    setError(true)
  }

  return !error ? (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/' exact>
            <TaskContextProvider handleError={message => showError(message)}>
              <Tasks handleError={message => showError(message)} />
            </TaskContextProvider>
          </Route>

          <Route path='/tasks/:taskid/subtasks'>
            <div>subtasks route</div>
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <Error message={message} />
  )
}

export default App
