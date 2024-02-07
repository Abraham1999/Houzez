let userId = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).userId
  : null;
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).auth_token
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
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.auth_token,
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
