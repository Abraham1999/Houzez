import { useContext, useEffect, useReducer, useState } from "react";
import { UserContext, filterPropertyData } from "../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { propertyReducer } from "../../services/reducers/property";
import { getProperties } from "../../services/actions/properties";
import { TbBed } from "react-icons/tb";
import { GiShower, GiTreeBranch } from "react-icons/gi";
import FilterComponent from "../../components/filter";
import {
  bathroomFilterOptions,
  bedroomFilterOptions,
  limitOptions,
  propertyTypeFilterOptions,
} from "../../utils/data";
import Tag from "../../components/Tag";

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

  console.log(bedroomFilter);
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
      />

      {filteredData.map((property) => (
        <div className="py-6" key={property.id}>
          <Link to={`/property/${property.id}`}>
            <div className="">
              <div className="rounded-lg shadow-lg border md:flex">
                <img
                  src={property.image.url}
                  alt={property.address}
                  className="max-w-1/3 min-w-1/3 w-full md:w-64 object-cover relative rounded-l-none md:rounded-l-lg rounded-t-lg md:rounded-t-none rounded-tl-lg md:rounded-tl-lg"
                />
                <div className="p-6 w-full">
                  <div className="flex justify-between">
                    <h2 className="font-bold text-xl md:text-3xl mb-2 text-black">
                      £{property.price}
                    </h2>
                    <Tag value={property.status} background="bg-teal-500" />
                  </div>
                  <div className="flex space-x-4 pb-4 pt-1">
                    <div className="flex space-x-1">
                      <TbBed
                        style={{
                          color: "black",
                          fontSize: "25px",
                          fontWeight: "normal",
                        }}
                      />
                      <p>{property.bedrooms} bd</p>
                    </div>

                    <div className="flex space-x-1">
                      <GiShower
                        style={{
                          color: "black",
                          fontSize: "25px",
                          fontWeight: "normal",
                        }}
                      />
                      <p>{property.bathrooms} ba</p>
                    </div>
                    <div className="flex space-x-1">
                      <GiTreeBranch
                        style={{
                          color: "black",
                          fontSize: "25px",
                          fontWeight: "normal",
                        }}
                      />
                      <p>{property.garden} gd</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xl font-semibold text-black">
                      {property.bedrooms} bed {property.type} house for sale
                    </p>
                    <p className="text-lg text-gray-500">
                      {property.address} {property.postcode}
                    </p>
                    <p className="text-lg py-2 text-black">
                      {property.description}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Listed on {property.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PropertiesPage;
