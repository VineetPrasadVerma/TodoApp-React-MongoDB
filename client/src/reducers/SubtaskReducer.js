export const subtaskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_SUBTASK':
      return [...action.subtasks.subTasks]

    case 'ADD_SUBTASK':
      return [...action.subtasks]

    case 'DELETE_SUBTASK':
      return state.filter(subtask => subtask._id !== action.subtask.subtaskId)

    case 'UPDATE_SUBTASK':
      return state.map(subtask => {
        if (subtask._id === action.subtask.subtaskId) {
          subtask.name = action.subtask.subtaskName
        }
        return subtask
      })

    default:
      return state
  }
}