import { Link, useNavigate } from "react-router-dom";
import {
  UserContext,
  filterBookingData,
  filterData,
} from "../../utils/helpers";
import { useContext, useEffect, useReducer, useState } from "react";
import FilterComponent from "../../components/filter";
import { limitOptions } from "../../utils/data";
import { deleteBooking, getBookings } from "../../services/actions/bookings";
import { bookingReducer } from "../../services/reducers/bookings";
import { TrashIcon } from "@heroicons/react/24/outline";
const BookingsPage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [bookings, dispatch] = useReducer(bookingReducer, []);

  useEffect(() => {
    if (!localStorage.getItem("houzez_email")) {
      navigate("/login");
    } else {
      if (user !== null) {
        getBookings(dispatch, user[0].id);
      }
    }
  }, [navigate, user]);

  const [limit, setLimit] = useState(limitOptions[0].value);
  const [searchBox, setSearchBox] = useState("");

  const filteredData = filterBookingData(bookings, limit, searchBox);

  const handleDeleteBooking = (id) => {
    deleteBooking(dispatch, id);
    getBookings(dispatch, user[0].id);
  };

  return (
    <div className="px-16 py-4">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-3xl font-bold leading-tight">
              Upcoming Bookings
            </h2>
          </div>

          <FilterComponent
            currentDataList={limit}
            setCurrentDataList={setLimit}
            setSearchBox={setSearchBox}
            source="common"
            searchPlaceHolder="Search"
          />

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Post Code
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Booking Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Delete
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link to={`/property/${booking.propertyId}`}>
                          <p className="text-gray-900 whitespace-no-wrap">
                            {booking.address}
                          </p>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {booking.postcode}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(booking.bookingTime).toUTCString()}
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="pl-4 cursor-pointer text-center">
                          <TrashIcon
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="w-8 h-8 text-red-600 text-center"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
