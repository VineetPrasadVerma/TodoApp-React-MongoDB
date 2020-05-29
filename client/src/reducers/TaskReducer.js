export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASK':
      return [...action.tasks]

    case 'ADD_TASK':
      return [...state, { _id: action.task.taskId, name: action.task.name }]

    case 'DELETE_TASK':
      return state.filter(task => task._id !== action.task.taskId)

    default:
      return state
  }
}
