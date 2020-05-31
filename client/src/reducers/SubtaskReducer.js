export const subtaskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_SUBTASK':
      return [...action.subtasks]

    case 'ADD_SUBTASK':
      return [...state, action.newSubtask]

    case 'DELETE_SUBTASK':
      return state.filter(subtask => subtask._id !== action.subtask.subtaskId)

    case 'UPDATE_SUBTASK':
      return state.map(subtask => {
        if (subtask._id === action.updatedSubtask._id) {
          subtask = action.updatedSubtask
        }
        return subtask
      })

    default:
      return state
  }
}
