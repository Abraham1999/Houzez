import { useContext, useEffect, useReducer, useState } from "react";
import { UserContext, filterPropertyData } from "../../utils/helpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { propertyReducer } from "../../services/reducers/property";
import { getSellerProperty } from "../../services/actions/properties";
import FilterComponent from "../../components/filter";

import {
  bathroomFilterOptions,
  bedroomFilterOptions,
  limitOptions,
  propertyTypeFilterOptions,
} from "../../utils/data";
import PropertyContainer from "../../containers/Property";

const SellerId = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const seller = useLocation().state;

  const user = useContext(UserContext);

  const [properties, dispatch] = useReducer(propertyReducer, []);

  useEffect(() => {
    if (!localStorage.getItem("houzez_email")) {
      navigate("/login");
    } else {
      getSellerProperty(dispatch, id);
    }
  }, [id, navigate]);

  const [limit, setLimit] = useState(limitOptions[0].value);
  const [bedroomFilter, setBedroomFilter] = useState(
    bedroomFilterOptions[0].value
  );
  const [typeFilter, setTypeFilter] = useState(
    propertyTypeFilterOptions[0].value
  );
  const [bathroomFilter, setBathroomFilter] = useState(
    bathroomFilterOptions[0].value
  );
  const [searchBox, setSearchBox] = useState("");

  const filteredData = filterPropertyData(
    properties,
    limit,
    searchBox,
    bedroomFilter,
    typeFilter,
    bathroomFilter
  );

  return (
    <div className="container mx-auto px-8 md:px-20  py-4">
      <div className="text-3xl font-bold ">Seller Information</div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {seller.firstName} {seller.lastName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {seller.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {seller.address} {seller.postcode}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {seller.phone}
            </dd>
          </div>
        </dl>
      </div>

      <div className="text-3xl font-bold py-2">Properties</div>
      <FilterComponent
        setCurrentDataList={setLimit}
        setSearchBox={setSearchBox}
        setBedroomFilter={setBedroomFilter}
        setBathroomFilter={setBathroomFilter}
        setTypeFilter={setTypeFilter}
        searchPlaceHolder="Search"
      />

      {filteredData.map((property) => (
        <PropertyContainer property={property} />
      ))}
    </div>
  );
};

export default SellerId;
