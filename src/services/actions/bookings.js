export const addBookingHandler = (newBooking, dispatch) => {
  fetch("http://localhost:5000/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBooking),
  })
    .then((response) => {
      if (!response.ok) {
        //return error (alert)
        throw response.status;
      } else return response.json();
    })
    .then((newBooking) => {
      dispatch({ type: "ADD_BOOKING", payload: newBooking });
    });
};

export const getBookings = (dispatch) => {
  fetch("http://localhost:5000/booking")
    .then((response) => {
      if (!response.ok) {
        alert("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((bookings) => {
      dispatch({ type: "GET_BOOKINGS", payload: bookings });
    })
    .catch((error) => {
      alert(error);
    });
};

export const getBooking = (dispatch, id, setLoading) => {
  fetch(`http://localhost:5000/booking?id=${id}`)
    .then((response) => {
      if (!response.ok) {
        alert("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((booking) => {
      dispatch({ type: "GET_BOOKING", payload: booking });
      setLoading(false);
    })
    .catch((error) => {
      alert(error);
    });
};

export const deleteBooking = (dispatch, id) => {
  fetch(`http://localhost:5000/booking/${id}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        alert("An error has occurred.");
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((booking) => {
      dispatch({ type: "DELETE_BOOKING", payload: booking });
    })
    .catch((error) => {
      alert(error);
    });
};

export const editBookingHandler = (
  updatedFields,
  existingBookingId,
  dispatch
) => {
  fetch(`http://localhost:5000/booking/${existingBookingId}`, {
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
    .then((updatedBooking) => {
      dispatch({ type: "UPDATE_BOOKING", payload: updatedBooking });
    });
};
