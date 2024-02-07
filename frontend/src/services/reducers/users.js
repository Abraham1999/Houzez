let userId = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).userId
  : null;
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).authorizationToken
  : null;

export const state = {
  userId: null || userId,
  token: null || token,
  loading: false,
  errorMessage: null,
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
        loading: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        user: action.payload.userId,
        loading: false,
        token: action.payload.authorizationToken,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.userId,
        token: action.payload.authorizationToken,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: "",
        token: "",
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    case "GET_USERS":
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    case "REMOVE_USER":
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};
