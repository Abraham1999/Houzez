import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { validateEmail } from "../../utils/helpers";
import { loginUserHandler } from "../../services/actions/users";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const clearForm = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(!emailRef.current.value);
    setPasswordError(!passwordRef.current.value);

    if (
      emailRef.current.value &&
      validateEmail(emailRef.current.value) &&
      passwordRef.current.value
    ) {
      loginUserHandler({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }).then((data) => {
        if (data.length === 1) {
          localStorage.setItem("houzez_email", data[0].email);
          navigate("/property");
          clearForm();
        } else {
          alert("Incorrect login details");
        }
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("houzez_email")) {
      navigate(-1);
    }
  }, [navigate]);

  return (
    <form>
      <div className="">
        <div className="">
          <Input
            type="email"
            label="Email Address"
            name="email"
            error={emailError}
            innerRef={emailRef}
            placeholder="Please enter your email address"
          />
        </div>

        <div className="">
          <Input
            type="text"
            label="Password"
            name="password"
            error={passwordError}
            innerRef={passwordRef}
            placeholder="Please enter your password"
          />
        </div>
      </div>
      <div className="">
        <Button
          type="submit"
          className=""
          onClick={handleSubmit}
          text="Login"
        />
      </div>
    </form>
  );
};
export default LoginPage;
