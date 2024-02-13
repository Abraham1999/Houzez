import React, { useRef, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { validateEmail } from "../../utils/helpers";
import { loginUserHandler } from "../../services/actions/users";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const clearForm = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(!emailRef.current.value);
    setPasswordError(!passwordRef.current.value);

    if (
      emailRef.current.value &&
      validateEmail(emailRef.current.value) &&
      passwordRef.current.value
    ) {
      await loginUserHandler(dispatch, {
        Email: emailRef.current.value,
        Password: passwordRef.current.value,
      }).then((data) => {
        if (data) {
          clearForm();
          navigate("/property");
        }
      });
    }
  };

  return (
    <main className="py-16 w-full max-w-2xl justify-center mx-auto">
      <p className="pb-4 text-6xl font-bold text-center">Login</p>
      <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div>
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
            label="Password"
            name="password"
            error={passwordError}
            innerRef={passwordRef}
            placeholder="Please enter your password"
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <Button
            type="submit"
            className="w-full bg-[#0C356A] hover:bg-[#0C356A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            text="Login"
            disabled={loading}
          />
        </div>
        <p className="pt-2">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-blue-600">
            Create account
          </Link>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
