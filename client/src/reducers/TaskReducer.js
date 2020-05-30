export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASK':
      return [...action.tasks]

    case 'ADD_TASK':
      return [...state, { _id: action.task.taskId, name: action.task.name }]

    case 'DELETE_TASK':
      return state.filter(task => task._id !== action.task.taskId)

    case 'UPDATE_TASK':
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
