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
    if (user === null) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    getUsers(dispatch, "seller");
  }, []);

  console.log(sellers);
  return <div>sellers Page</div>;
};

export default SellersPage;
