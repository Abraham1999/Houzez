import { useContext, useEffect, useReducer } from "react";
import { UserContext } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { propertyReducer } from "../../services/reducers/property";
import { getProperties } from "../../services/actions/properties";

const PropertiesPage = () => {
  const user = useContext(UserContext);

  const [properties, dispatch] = useReducer(propertyReducer, []);

  useEffect(() => {
    getProperties(dispatch);
  }, []);

  return (
    <div>
      <div>
        {user !== null && user[0].accountType === "seller" && (
          <div className="">
            <Link className="" to="add" text="Add Property">
              Add property
            </Link>
          </div>
        )}
      </div>

      <div>Properties</div>
      {properties.map((property) => (
        <div key={property.id}>
          <Link to={`/property/${property.id}`}>
            <p>{property.address}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PropertiesPage;
