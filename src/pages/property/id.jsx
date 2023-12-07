import { useContext, useEffect, useReducer, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../utils/helpers";
import { propertyReducer } from "../../services/reducers/property";
import { usersReducer } from "../../services/reducers/users";
import {
  deleteProperty,
  editPropertyHandler,
  getProperty,
} from "../../services/actions/properties";
import Button from "../../components/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import {
  addBookingHandler,
  deleteBooking,
  deleteMultipleBookings,
  editBookingHandler,
  getBooking,
  getPropertyBookings,
  getSellerPropertyBookings,
} from "../../services/actions/bookings";
import { bookingReducer } from "../../services/reducers/bookings";
import Select from "../../components/select";
import { statusTypes } from "../../utils/data";
import { getUsers } from "../../services/actions/users";
import Tag from "../../components/Tag";
import { TbBed } from "react-icons/tb";
import { GiShower, GiTreeBranch } from "react-icons/gi";
import Loader from "../../components/loader";

function PropertyByIdPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [property, dispatch] = useReducer(propertyReducer, []);
  const [booking, dispatchBooking] = useReducer(bookingReducer, []);
  const [allPropertyBookings, dispatchAllPropertyBooking] = useReducer(
    bookingReducer,
    []
  );
  const [showBookingsForm, setShowBookingsForm] = useState(false);
  const user = useContext(UserContext);
  const [viewingDate, setViewingDate] = useState(null);
  const [showChangeStatusForm, setShowChangeStatusForm] = useState(false);
  const [status, setStatus] = useState(null);
  const [propertyBuyer, setPropertyBuyer] = useState(null);
  const [sellerPropertyBookings, dispatchSellerPropertyBookings] = useReducer(
    bookingReducer,
    []
  );

  useEffect(() => {
    setLoading(true);
    getProperty(dispatch, id, setLoading);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    getBooking(dispatchBooking, user !== null && user[0].id, id, setLoading);
  }, [id, user]);

  useEffect(() => {
    setLoading(true);
    getPropertyBookings(dispatchAllPropertyBooking, id, setLoading);
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
    getUsers(dispatchGetBuyerList, "buyer");
  }, []);

  useEffect(() => {
    if (user !== null && user[0].accountType === "seller")
      getSellerPropertyBookings(dispatchSellerPropertyBookings, user[0].id, id);
  }, [id, user]);

  const buyersForArray = buyers.map((buyer) => {
    return { label: buyer.firstName + " " + buyer.lastName, value: buyer.id };
  });

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
          buyerName: `${user[0].firstName} ${user[0].lastName}`,
          sellerId: property[0].sellerId,
          propertyId: property[0].id,
          address: property[0].address,
          postcode: property[0].postcode,
        },
        dispatch
      );
      setShowBookingsForm(false);
      setViewingDate(null);
      getBooking(dispatchBooking, user !== null && user[0].id, id, setLoading);
    } else {
      editBookingHandler(
        {
          bookingTime: viewingDate,
        },
        booking[0].id,
        dispatch
      );
      setShowBookingsForm(false);
      setViewingDate(null);
      getBooking(dispatchBooking, user !== null && user[0].id, id, setLoading);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("houzez_email")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleDeleteBooking = async () => {
    deleteBooking(dispatch, booking[0].id);
    await getBooking(
      dispatchBooking,
      user !== null && user[0].id,
      id,
      setLoading
    );
  };

  const handleChangeStatus = (propertyId) => {
    editPropertyHandler(
      {
        buyerId: propertyBuyer,
        status: status,
      },
      propertyId,
      dispatch
    );
    setShowBookingsForm(false);
    setLoading(true);
    deleteMultipleBookings(dispatchBooking, propertyId);
    setLoading(false);
    setShowChangeStatusForm(!showChangeStatusForm);
    navigate("/property");
  };

  const excludedDates = allPropertyBookings.map((booking) => {
    const date = new Date(booking.bookingTime);
    return new Date(0, 0, 0, date.getHours(), date.getMinutes());
  });

  return (
    <div className="container mx-auto px-8 md:px-20  py-4">
      {loading || property.length === 0 ? (
        <Loader />
      ) : (
        <>
          {user !== null &&
            property.length > 0 &&
            user[0].accountType === "seller" &&
            property[0].sellerId === user[0].id && (
              <div className="pb-8 space-x-5 flex justify-end">
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
              </div>
            )}

          <div>
            <div className="">
              <img
                src={property[0].image.url}
                alt={property[0].address}
                className="rounded-lg w-full aspect-[6/3]"
              />
            </div>

            <div className="py-4">
              <Tag
                value={property[0].status}
                extraStyle="mt-4 bg-cyan-500 w-fit text-center"
              />

              <h1 className="text-4xl font-bold pt-4 pb-2">
                £{property[0].price}
              </h1>
              <p className="text-xl font-semibold text-black">
                {property[0].bedrooms} bed {property[0].type} house for sale
              </p>
              <p className="text-lg font-normal text-gray-600">
                {property[0].address} {property[0].postcode}
              </p>
              <p className="text-xl font-semibold py-3">
                {property[0].description}
              </p>

              <div className="flex space-x-4 pb-4 pt-1">
                <div className="flex space-x-1">
                  <TbBed
                    style={{
                      color: "black",
                      fontSize: "25px",
                      fontWeight: "normal",
                    }}
                  />
                  <p>{property[0].bedrooms} bd</p>
                </div>

                <div className="flex space-x-1">
                  <GiShower
                    style={{
                      color: "black",
                      fontSize: "25px",
                      fontWeight: "normal",
                    }}
                  />
                  <p>{property[0].bathrooms} ba</p>
                </div>
                <div className="flex space-x-1">
                  <GiTreeBranch
                    style={{
                      color: "black",
                      fontSize: "25px",
                      fontWeight: "normal",
                    }}
                  />
                  <p>{property[0].garden} gd</p>
                </div>
              </div>

              <p className="text-lg font-normal">
                Property added on {property[0].createdAt}
              </p>
            </div>

            {user !== null &&
              property.length > 0 &&
              user[0].accountType === "seller" &&
              property[0].sellerId === user[0].id && (
                <div className="">
                  <h1 className="text-2xl border-b border-gray-300 py-2">
                    Manage property status
                  </h1>
                  <Button
                    type="button"
                    className="mt-6 bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() =>
                      setShowChangeStatusForm(!showChangeStatusForm)
                    }
                    text="Change Status"
                  />
                </div>
              )}

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
                      options={buyersForArray}
                      value={propertyBuyer}
                      onChange={(e) => setPropertyBuyer(e.target.value)}
                    />
                  </div>
                )}
                <div className="mt-4">
                  <Button
                    type="button"
                    className="bg-[#0C356A] hover:bg-[#0C356A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleChangeStatus(property[0].id)}
                    text="Submit"
                  />
                </div>
              </div>
            )}

            {user !== null &&
              user[0].accountType === "seller" &&
              user[0].id === property[0].sellerId && (
                <div>
                  <div className="mt-4">
                    <h1 className="text-2xl border-b border-gray-300 py-2">
                      Manage bookings
                    </h1>

                    {sellerPropertyBookings.length === 0 ? (
                      <div className="pt-6">
                        <p className="text-center font-bold text-xl">
                          No bookings on this property.
                        </p>
                      </div>
                    ) : (
                      <dl className="divide-y divide-gray-100">
                        {sellerPropertyBookings.map((booking) => (
                          <div
                            className="px-4 py-6 flex justify-between"
                            key={booking.id}
                          >
                            <dt className="text-lg font-medium leading-6 text-gray-900">
                              {booking.buyerName}
                            </dt>
                            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {new Date(booking.bookingTime).toUTCString()}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </div>
              )}

            {user !== null && user[0].accountType === "buyer" && (
              <div>
                <div className="mt-4">
                  <div className="py-2 flex justify-between border-b border-gray-300 ">
                    <h1 className="text-2xl">Manage bookings</h1>
                    <Button
                      type="button"
                      className=" bg-[#0C356A] hover:bg-[#0C356A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleShowBookingForm()}
                      text={
                        booking.length === 0 ? "Add booking" : "Edit booking"
                      }
                    />
                  </div>

                  {booking.length === 0 ? (
                    <div className="pt-6">
                      <p className="text-center font-bold text-xl">
                        You have no booking
                      </p>{" "}
                    </div>
                  ) : (
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 flex justify-between">
                        <dt className="text-lg font-medium leading-6 text-gray-900">
                          Current Booking
                        </dt>
                        <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {new Date(booking[0].bookingTime).toUTCString()}
                        </dd>
                      </div>
                    </dl>
                  )}

                  <div className="flex justify-end space-x-4">
                    {booking.length > 0 &&
                      user[0].accountType === "buyer" &&
                      user[0].id === booking[0].buyerId &&
                      !showBookingsForm && (
                        <div>
                          <div>
                            <Button
                              type="button"
                              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              onClick={() => handleDeleteBooking()}
                              text="Delete booking"
                            />
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}

            {showBookingsForm && (
              <div>
                <div>
                  <div className="relative pb-4 w-full">
                    <label
                      htmlFor="viewingDate"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Select Date and Time
                    </label>
                    <DatePicker
                      selected={viewingDate}
                      dateFormat="Pp"
                      showTimeSelect
                      wrapperClassName="w-full"
                      id="viewingDate"
                      excludeTimes={excludedDates}
                      className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          </div>
        </>
      )}
    </div>
  );
}

export default PropertyByIdPage;
