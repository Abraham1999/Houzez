export const usersReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return state.concat(action.payload);
    case "GET_USER":
      return action.payload;
    case "GET_USERS":
      return action.payload;
    case "REMOVE_USER":
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};
