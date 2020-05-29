export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASK':
      return [...action.tasks]

    case 'ADD_TASK':
      return [...state]
    default:
      return state
  }
}
