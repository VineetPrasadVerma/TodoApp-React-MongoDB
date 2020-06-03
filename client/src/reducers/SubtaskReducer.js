export const subtaskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUBTASK':
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

    case 'SORT_SUBTASKS':
      state.sort((a, b) => a.createdAt - b.createdAt)

      state.sort((a, b) => {
        if (a.scheduled > b.scheduled) return 1
        if (b.scheduled > a.scheduled) return -1
        return 0
      })

      state.sort((a, b) => b.priority - a.priority)

      state.sort((a, b) => {
        if (a.completed > b.completed) return 1
        if (b.completed > a.completed) return -1
        return 0
      })

      return [...state]

    case 'DELETE_COMPLETED_SUBTASKS':
      return state.filter(subtask => !subtask.completed)

    default:
      return state
  }
}
