export const addPropertyHandler = (newProperty, dispatch) => {
  fetch("http://localhost:5000/property", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProperty),
  })
    .then((response) => {
      if (!response.ok) {
        //return error (alert)
        throw response.status;
      } else return response.json();
    })
    .then((newProperty) => {
      dispatch({ type: "ADD_PROPERTY", payload: newProperty });
    });
};

export const getProperties = (dispatch) => {
  fetch("http://localhost:5000/property")
    .then((response) => {
      if (!response.ok) {
        alert("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((properties) => {
      dispatch({ type: "GET_PROPERTIES", payload: properties });
    })
    .catch((error) => {
      alert(error);
    });
};

export const getProperty = (dispatch, id, setLoading) => {
  fetch(`http://localhost:5000/property?id=${id}`)
    .then((response) => {
      if (!response.ok) {
        alert("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((properties) => {
      dispatch({ type: "GET_PROPERTY", payload: properties });
      setLoading(false);
    })
    .catch((error) => {
      alert(error);
    });
};

export const deleteProperty = (dispatch, id) => {
  fetch(`http://localhost:5000/property/${id}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        alert("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((properties) => {
      dispatch({ type: "DELETE_PROPERTY", payload: properties });
    })
    .catch((error) => {
      alert(error);
    });
};

export const editPropertyHandler = (
  updatedFields,
  existingPropertyId,
  dispatch
) => {
  fetch(`http://localhost:5000/property/${existingPropertyId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  })
    .then((response) => {
      if (!response.ok) {
        //return error (alert)
        throw response.status;
      } else return response.json();
    })
    .then((updatedProperty) => {
      dispatch({ type: "UPDATE_PROPERTY", payload: updatedProperty });
    });
};
