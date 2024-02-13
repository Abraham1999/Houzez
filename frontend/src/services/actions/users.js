import toast from "react-hot-toast";
import config from "../../config";
import axios from "axios";

export async function loginUserHandler(dispatch, loginPayload) {
  const configHeaders = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(loginPayload);
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await axios.post(
      `${config.baseApiUrl}/token/login`,
      body,
      configHeaders
    );
    if (response.status === 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    toast.error("Incorrect email or password.");
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}

export const addUserHandler = async (dispatch, newUser) => {
  const configHeaders = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newUser);
  console.log(body);
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await axios.post(
      `${config.baseApiUrl}/token/register`,
      body,
      configHeaders
    );
    if (response.status === 200) {
      dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "REGISTER_ERROR", error: error });
    toast.error(error.response.data);
  }
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
