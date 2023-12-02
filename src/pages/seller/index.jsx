import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/helpers";
import { useContext, useEffect, useReducer } from "react";
import { usersReducer } from "../../services/reducers/users";
import { getUsers } from "../../services/actions/users";

const SellersPage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [sellers, dispatch] = useReducer(usersReducer, []);

  useEffect(() => {
    if (!localStorage.getItem("houzez_email")) {
      navigate("/login");
    } else {
      getUsers(dispatch, "seller");
    }
  }, [navigate]);

  console.log(sellers);
  return <div>sellers Page</div>;
};

export default SellersPage;
