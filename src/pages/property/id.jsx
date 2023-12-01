import { useContext, useEffect, useReducer, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../utils/helpers";
import { propertyReducer } from "../../services/reducers/property";
import { deleteProperty, getProperty } from "../../services/actions/properties";
import Button from "../../components/button";

function PropertyByIdPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [property, dispatch] = useReducer(propertyReducer, []);
  const user = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    getProperty(dispatch, id, setLoading);
  }, [id]);

  const handleDeleteProperty = () => {
    if (!loading && property[0].sellerId === user[0].id) {
      deleteProperty(dispatch, id, setLoading);
      navigate("/property");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          {user !== null &&
            property.length > 0 &&
            property[0].sellerId === user[0].id && (
              <>
                <Button
                  type="button"
                  className=""
                  onClick={() => handleDeleteProperty()}
                  text="Delete property"
                />
                <Link
                  to="/property/add"
                  state={!loading && property[0]}
                  className=""
                >
                  Edit Property
                </Link>
              </>
            )}
        </>
      )}
    </div>
  );
}

export default PropertyByIdPage;
