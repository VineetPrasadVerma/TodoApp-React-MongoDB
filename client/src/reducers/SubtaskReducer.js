export const subtaskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_SUBTASK':
      return [...action.subtasks]

    case 'ADD_SUBTASK':
      return [...state, { _id: action.task.taskId, name: action.task.name }]

    case 'DELETE_SUBTASK':
      return state.filter(task => task._id !== action.task.taskId)

    case 'UPDATE_SUBTASK':
      return state.map(task => {
        if (task._id === action.task.taskId) {
          task.name = action.task.name
        }
        return task
      })

    default:
      return state
  }
}
