import toast from "react-hot-toast";
import config from "../../config";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
	
// Response body
// Download
// {
//   "userId": "8",
//   "authorizationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiJkNTdmMmZhYi02MWVlLTRhMGItODk1OC0xOGY5MWRlYjM4YjQiLCJpYXQiOiIwNi8wMi8yMDI0IDE2OjM2OjA2IiwiVXNlcklkIjoiOCIsIkVtYWlsIjoidGVzdDEyM0BnbWFpbC5jb20iLCJleHAiOjE3MDcyMzc5NjYsImlzcyI6IkpXVEF1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiSldUU2VydmljZVBvc3RtYW5DbGllbnQifQ.uMCjevGTGCjf-LaLIbjs74X-aLizSGOWAnfDpvEVvzU",
//   "refreshToken": ""
// }
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await  axios.get('/user/auth');

    dispatch({
      type: "USER_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "LOGIN_ERROR",
    });
  }
};


export async function loginUserHandler(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${config.baseApiUrl}/login`, requestOptions);
    let data = await response.json();

    console.log(data);
    if (data.authorizationToken) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      // localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    toast.error(data.errors[0]);
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    toast.error("Error signing you in, please ty again.")
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}

export const addUserHandler = (newUser, dispatch) => {
  fetch("http://localhost:5000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (!response.ok) {
        //return error (alert)
        throw response.status;
      } else return response.json();
    })
    .then((newUser) => {
      dispatch({ type: "ADD_USER", payload: newUser });
    });
};

export const getUserByEmail = async () => {
  const userEmail = localStorage.getItem("houzez_email");
  if (userEmail !== null) {
    const response = await fetch(
      `http://localhost:5000/users?email=${userEmail}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw response.status;
    } else {
      return data;
    }
  } else {
    return null;
  }
};

export const getUsers = (dispatch, type) => {
  fetch(`http://localhost:5000/users?accountType=${type}`)
    .then((response) => {
      if (!response.ok) {
        alert("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((users) => {
      dispatch({ type: "GET_USERS", payload: users });
    })
    .catch((error) => {
      alert(error);
    });
};

export const getAllUsers = (dispatch) => {
  fetch("http://localhost:5000/users")
    .then((response) => {
      if (!response.ok) {
        alert("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((users) => {
      dispatch({ type: "GET_USERS", payload: users });
    })
    .catch((error) => {
      alert(error);
    });
};
