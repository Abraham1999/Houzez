import { useContext, useEffect, useReducer, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../utils/helpers";
import { propertyReducer } from "../../services/reducers/property";
import { deleteProperty, getProperty } from "../../services/actions/properties";
import Button from "../../components/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import {
  addBookingHandler,
  deleteBooking,
  editBookingHandler,
  getBooking,
} from "../../services/actions/bookings";
import { bookingReducer } from "../../services/reducers/bookings";
import Select from "../../components/select";
import { statusTypes } from "../../utils/data";

function PropertyByIdPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [property, dispatch] = useReducer(propertyReducer, []);
  const [booking, dispatchBooking] = useReducer(bookingReducer, []);
  const [showBookingsForm, setShowBookingsForm] = useState(false);
  const user = useContext(UserContext);
  const [viewingDate, setViewingDate] = useState(null);
  const [showChangeStatusForm, setShowChangeStatusForm] = useState(false);
  const [status, setStatus] = useState(null);
  const [propertyBuyer, setPropertyBuyer] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProperty(dispatch, id, setLoading);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    getBooking(dispatchBooking, user !== null && user[0].id, id, setLoading);
  }, [id, user]);

  useEffect(() => {
    if (booking.length > 0 && showBookingsForm) {
      setViewingDate(new Date(booking[0].bookingTime));
    }
  }, [booking, showBookingsForm]);

  useEffect(() => {
    if (property.length > 0 && showChangeStatusForm) {
      setStatus(property[0].status);
    }
  }, [property, showChangeStatusForm]);

  const [buyers, dispatchGetBuyerList] = useReducer(usersReducer, []);

  useEffect(() => {
    dispatchGetBuyerList(dispatch, "buyer");
  }, []);

  const buyersForArray = buyers.map(buyer => {
    return {label}
  })

  const handleDeleteProperty = () => {
    if (!loading && property[0].sellerId === user[0].id) {
      deleteProperty(dispatch, id);
      navigate("/property");
    }
  };

  const handleShowBookingForm = () => {
    setShowBookingsForm(!showBookingsForm);
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (booking.length === 0) {
      addBookingHandler(
        {
          createdAt: new Date().toUTCString(),
          bookingTime: viewingDate,
          buyerId: user[0].id,
          propertyId: property[0].id,
          address: property[0].address,
          postcode: property[0].postcode,
        },
        dispatch
      );
      setShowBookingsForm(false);
      setViewingDate(null);
    } else {
      editBookingHandler(
        {
          bookingTime: viewingDate,
        },
        booking[0].id,
        dispatch
      );
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("houzez_email")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleDeleteBooking = () => {
    deleteBooking(dispatch, booking[0].id);
  };

  const handleChangeStatus = () => {};

  console.log(property);

  return (
    <div className="container mx-auto px-8 md:px-20  py-4">
      {loading ? (
        <h1 className="text-center py-48 text-9xl text-[#0C356A]">
          Loading...
        </h1>
      ) : (
        <>
          {user !== null &&
            property.length > 0 &&
            user[0].accountType === "seller" &&
            property[0].sellerId === user[0].id && (
              <div className="space-x-5 flex justify-end">
                <Button
                  type="button"
                  className=" bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDeleteProperty()}
                  text="Delete property"
                />
                <Link
                  to="/property/add"
                  state={!loading && property[0]}
                  className=" bg-[#0C356A] hover:bg-[#0C356A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit Property
                </Link>
                <Button
                  type="button"
                  className=" bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setShowChangeStatusForm(!showChangeStatusForm)}
                  text="Change Status"
                />
              </div>
            )}

          <div>
            <div>Property Content goes here</div>
            <p>All added bookings goes here</p>
            <p>Make property sold</p>

            {showChangeStatusForm && (
              <div>
                <div className="mt-4">
                  <Select
                    label="Status"
                    name="status"
                    options={statusTypes}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>

                {status === statusTypes[1].value && (
                  <div className="mt-4">
                    <Select
                      label="Sold to"
                      name="buyer"
                      options={[]}
                      value={propertyBuyer}
                      onChange={(e) => setPropertyBuyer(e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <Button
                    type="button"
                    className=" bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleChangeStatus()}
                    text="Submit"
                  />
                </div>
              </div>
            )}

            {user !== null && user[0].accountType === "buyer" && (
              <div>
                <Button
                  type="button"
                  className="bg-[#0C356A] hover:bg-[#0C356A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleShowBookingForm}
                  text={booking.length === 0 ? "Add booking" : "Edit booking"}
                />
              </div>
            )}

            {showBookingsForm && (
              <div>
                <div>
                  <div className="relative py-4">
                    <label
                      htmlFor="viewingDate"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Select date and Time
                    </label>
                    <DatePicker
                      selected={viewingDate}
                      dateFormat="Pp"
                      showTimeSelect
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(date) => setViewingDate(date)}
                    />
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="bg-[#0C356A] hover:bg-[#0C356A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleBooking}
                      text="Submit"
                    />
                  </div>
                </div>
              </div>
            )}

            {booking.length > 0 &&
              user[0].accountType === "buyer" &&
              user[0].id === booking[0].buyerId && (
                <div>
                  <div>
                    <Button
                      type="submit"
                      className="bg-[#0C356A] hover:bg-[#0C356A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleDeleteBooking}
                      text="Delete"
                    />
                  </div>
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
}

export default PropertyByIdPage;
