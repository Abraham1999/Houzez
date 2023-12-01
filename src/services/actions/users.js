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

export const loginUserHandler = async ({ email, password }) => {
  const response = await fetch(
    `http://localhost:5000/users?email=${email}&password=${password}`,
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
};
