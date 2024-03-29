import { Link, useNavigate } from "react-router-dom";
import { filterData, generateInitials } from "../../utils/helpers";
import { useEffect, useReducer, useState } from "react";
import { usersReducer } from "../../services/reducers/users";
import { getUsers } from "../../services/actions/users";
import FilterComponent from "../../components/filter";
import { limitOptions } from "../../utils/data";

const BuyersPage = () => {
  const navigate = useNavigate();

  const [buyers, dispatch] = useReducer(usersReducer, []);

  useEffect(() => {
    if (!localStorage.getItem("houzez_email")) {
      navigate("/login");
    } else {
      getUsers(dispatch, "buyer");
    }
  }, [navigate]);

  const [limit, setLimit] = useState(limitOptions[0].value);
  const [searchBox, setSearchBox] = useState("");

  const filteredData = filterData(buyers, limit, searchBox);

  return (
    <div className="px-16 py-4" role="main">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-3xl font-bold leading-tight">
              Available Buyers
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
                      Full Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider"><span className="sr-only">View</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((buyer) => (
                    <tr key={buyer.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="bg-[#0C356A] text-center rounded-full">
                            <p className="px-4 py-4 text-center text-white text-sm">
                              {generateInitials(
                                buyer.firstName,
                                buyer.lastName
                              )}
                            </p>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {`${buyer.firstName} ${buyer.lastName}`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {buyer.address}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {buyer.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {buyer.createdAt}
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link
                          to={`/buyers/${buyer.id}`}
                          state={buyer}
                          className="text-[#0C356A]"
                        >
                          View
                        </Link>
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

export default BuyersPage;
