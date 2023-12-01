import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/helpers";
import { useContext, useEffect, useReducer } from "react";
import { usersReducer } from "../../services/reducers/users";
import { getUsers } from "../../services/actions/users";

const BuyersPage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [buyers, dispatch] = useReducer(usersReducer, []);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    getUsers(dispatch, "buyer");
  }, []);

  return <div>Buyers Page</div>;
};

export default BuyersPage;
