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
    if (!localStorage.getItem("houzez_email")) {
      navigate("/login");
    } else {
      getUsers(dispatch, "buyer");
    }
  }, [navigate]);

  return <div>Buyers Page</div>;
};

export default BuyersPage;
