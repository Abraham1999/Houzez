export const bookingReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKING":
      return state.concat(action.payload);
    case "GET_BOOKING":
    case "UPDATE_BOOKING":
      return action.payload;
    case "GET_BOOKINGS":
      return action.payload;
    case "DELETE_BOOKING":
      return state.filter((booking) => booking.id !== action.payload);
    default:
      return state;
  }
};
