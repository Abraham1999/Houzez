import { useContext, useEffect, useReducer, useState } from "react";
import { UserContext, filterPropertyData } from "../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { propertyReducer } from "../../services/reducers/property";
import { getProperties } from "../../services/actions/properties";
import FilterComponent from "../../components/filter";
import {
  bathroomFilterOptions,
  bedroomFilterOptions,
  limitOptions,
  propertyTypeFilterOptions,
} from "../../utils/data";
import PropertyContainer from "../../containers/Property";

const PropertiesPage = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const [properties, dispatch] = useReducer(propertyReducer, []);

  useEffect(() => {
    if (!localStorage.getItem("houzez_email")) {
      navigate("/login");
    } else {
      getProperties(dispatch);
    }
  }, [navigate]);

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
      <div>
        {user !== null && user[0].accountType === "seller" && (
          <div className="flex justify-end py-4">
            <Link
              className=" bg-[#0C356A] hover:bg-[#0C356A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              to="add"
              text="Add Property"
            >
              Add property
            </Link>
          </div>
        )}
      </div>

      <FilterComponent
        setCurrentDataList={setLimit}
        setSearchBox={setSearchBox}
        setBedroomFilter={setBedroomFilter}
        setBathroomFilter={setBathroomFilter}
        setTypeFilter={setTypeFilter}
        searchPlaceHolder="Search"
      />

      {filteredData.map((property) => (
        <PropertyContainer property={property} key={property.id} />
      ))}
    </div>
  );
};

export default PropertiesPage;
