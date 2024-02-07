import React, { useEffect, useReducer, useRef, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import RadioButton from "../../components/radio";
import { validateEmail } from "../../utils/helpers";
import { addUserHandler, getAllUsers } from "../../services/actions/users";
import { usersReducer } from "../../services/reducers/users";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const postcodeRef = useRef();
  const passwordRef = useRef();

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [postcodeError, setPostcodeError] = useState(false);
  const [accountType, setAccountType] = useState("buyer");
  const [userCreated, setUserCreated] = useState(false);
  const handleChangeAccountType = (e) => {
    setAccountType(e.target.value);
  };
  const [user, dispatch] = useReducer(usersReducer, []);
  const [usersList, dispatchGetAllUsers] = useReducer(usersReducer, []);

  const clearForm = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    addressRef.current.value = "";
    emailRef.current.value = "";
    postcodeRef.current.value = "";
    phoneRef.current.value = "";
    passwordRef.current.value = "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setFirstNameError(!firstNameRef.current.value);
    setLastNameError(!lastNameRef.current.value);
    setEmailError(!emailRef.current.value);
    setAddressError(!addressRef.current.value);
    setPhoneError(!phoneRef.current.value);
    setPostcodeError(!postcodeRef.current.value);
    setPasswordError(!passwordRef.current.value);

    if (
      firstNameRef.current.value &&
      lastNameRef.current.value &&
      emailRef.current.value &&
      validateEmail(emailRef.current.value) &&
      addressRef.current.value &&
      phoneRef.current.value &&
      passwordRef.current.value &&
      postcodeRef.current.value
    ) {
      let checkIfEmailExists = usersList.filter((user) =>
        user.email.includes(emailRef.current.value)
      );

      if (checkIfEmailExists.length > 0) {
        alert("User Exists, select another email.");
        return;
      }

      addUserHandler(
        {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          address: addressRef.current.value,
          postcode: postcodeRef.current.value,
          phone: phoneRef.current.value,
          password: passwordRef.current.value,
          accountType,
          createdAt: new Date().toUTCString(),
        },
        dispatch
      );
      setUserCreated(!userCreated);
      clearForm();
    }
  };

  useEffect(() => {
    if (
      user &&
      user[0] &&
      userCreated &&
      localStorage.getItem("houzez_email") === null
    ) {
      //Store the user's email in the local storage so we can use it a as means of validating if the user has an account.
      localStorage.setItem("houzez_email", user[0].email);
    }
  }, [user, userCreated]);

  useEffect(() => {
    if (localStorage.getItem("houzez_email")) {
      navigate("/property");
    }
  }, [navigate, user, userCreated]);

  useEffect(() => {
    getAllUsers(dispatchGetAllUsers);
  }, []);

  return (
    <main className="w-full max-w-2xl justify-center mx-auto">
      <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <div>
            <p className="pb-4 text-6xl font-bold text-center">
              Create Account
            </p>
            <Input
              type="text"
              label="First Name"
              name="firstName"
              error={firstNameError}
              innerRef={firstNameRef}
              placeholder="Please enter your first name"
            />
          </div>
          <div className="mt-4">
            <Input
              type="text"
              label="Last Name"
              name="lastName"
              error={lastNameError}
              innerRef={lastNameRef}
              placeholder="Please enter your last name"
            />
          </div>
          <div className="mt-4">
            <Input
              type="email"
              label="Email Address"
              name="email"
              error={emailError}
              innerRef={emailRef}
              placeholder="Please enter your email address"
            />
          </div>
          <div className="mt-4">
            <Input
              type="text"
              label="Address"
              name="address"
              error={addressError}
              innerRef={addressRef}
              placeholder="Please enter your address"
            />
          </div>
          <div className="mt-4">
            <Input
              type="text"
              label="Post Code"
              name="postCode"
              error={postcodeError}
              innerRef={postcodeRef}
              placeholder="Please enter your post code"
            />
          </div>
          <div className="mt-4">
            <Input
              type="text"
              label="Phone Number"
              name="phoneNumber"
              error={phoneError}
              innerRef={phoneRef}
              placeholder="Please enter your phone number"
            />
          </div>

          <div className="mt-4">
            <RadioButton
              label="Buyer"
              name="buyer"
              onChange={(e) => handleChangeAccountType(e)}
              value="buyer"
              checked={accountType === "buyer"}
            />
          </div>

          <div className="mt-4">
            <RadioButton
              label="Seller"
              name="seller"
              onChange={(e) => handleChangeAccountType(e)}
              value="seller"
              checked={accountType === "seller"}
            />
          </div>

          <div className="mt-4">
            <Input
              type="password"
              label="Password"
              name="password"
              error={passwordError}
              innerRef={passwordRef}
              placeholder="Please enter your password"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-8">
          <Button
            type="submit"
            className="w-full bg-[#0C356A] hover:bg-[#0C356A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            text="Register"
          />
        </div>
        <p className="pt-2">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
};
export default RegisterPage;
