export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASK':
      return [...action.tasks]

    case 'ADD_TASK':
      return [...state, { _id: action.task.taskId, name: action.task.name }]

    default:
      return state
  }
}
