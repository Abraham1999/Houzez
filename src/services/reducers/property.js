export const propertyReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PROPERTY":
      return state.concat(action.payload);
    case "GET_PROPERTY":
    case "UPDATE_PROPERTY":
      return action.payload;
    case "GET_PROPERTIES":
      return action.payload;
    case "DELETE_PROPERTY":
      return state.filter((property) => property.id !== action.payload);
    default:
      return state;
  }
};
