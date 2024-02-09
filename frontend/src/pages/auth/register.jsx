import React, { useRef, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import RadioButton from "../../components/radio";
import { validateEmail } from "../../utils/helpers";
import { addUserHandler } from "../../services/actions/users";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { loading } = useAuthState();

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
  const [AccountType, setAccountType] = useState("buyer");
  
  const handleChangeAccountType = (e) => {
    setAccountType(e.target.value);
  };

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
      // let checkIfEmailExists = usersList.filter((user) =>
      //   user.email.includes(emailRef.current.value)
      // );

      // if (checkIfEmailExists.length > 0) {
      //   alert("User Exists, select another email.");
      //   return;
      // }

      addUserHandler(dispatch, {
        FirstName: firstNameRef.current.value,
        LastName: lastNameRef.current.value,
        Email: emailRef.current.value,
        Address: addressRef.current.value,
        PostCode: postcodeRef.current.value,
        Phone: phoneRef.current.value,
        Password: passwordRef.current.value,
        AccountType,
        CreatedAt: new Date().toUTCString(),
      }).then((data) => {
        if (data) {
          clearForm();
          navigate("/property");
        }
      });
    }
  };

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
              checked={AccountType === "buyer"}
            />
          </div>

          <div className="mt-4">
            <RadioButton
              label="Seller"
              name="seller"
              onChange={(e) => handleChangeAccountType(e)}
              value="seller"
              checked={AccountType === "seller"}
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
            disabled={loading}
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
