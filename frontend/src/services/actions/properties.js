import config from "../../config";
import axios from "axios";
import toast from "react-hot-toast";

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

export const getProperties = async (dispatch) => {
  // fetch("http://localhost:5000/property")
  await axios
    .get(`${config.baseApiUrl}/Property`)
    .then((response) => {
      if (!response.status === 200) {
        toast.error("An error has occurred.");
        throw response.status;
      } else {
        return response.data;
      }
    })
    .then((properties) => {
      dispatch({ type: "GET_PROPERTIES", payload: properties });
    })
    .catch((error) => {
      toast.error(error);
    });
};

export const getProperty = (dispatch, id, setLoading) => {
  fetch(`http://localhost:5000/property?id=${id}`)
    .then((response) => {
      if (!response.ok) {
        toast.error("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      dispatch({ type: "GET_PROPERTY", payload: data });
      setLoading(false);
    })
    .catch((error) => {
      toast.error(error);
    });
};

export const deleteProperty = (dispatch, id) => {
  fetch(`http://localhost:5000/property/${id}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        toast.error("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      dispatch({ type: "DELETE_PROPERTY", payload: data });
    })
    .catch((error) => {
      toast.error(error);
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

export const getPropertyForBooking = async (id) => {
  if (id) {
    const response = await fetch(`http://localhost:5000/property?id=${id}`, {
      method: "GET",
    });
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

export const getSellerProperty = (dispatch, id) => {
  fetch(`http://localhost:5000/property?sellerId=${id}`)
    .then((response) => {
      if (!response.ok) {
        toast.error("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      dispatch({ type: "GET_PROPERTY", payload: data });
    })
    .catch((error) => {
      toast.error(error);
    });
};
