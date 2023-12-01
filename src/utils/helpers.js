import { createContext } from "react";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const validateEmail = (value) => {
  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&`*+/=?_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  return emailRegex.test(value);
};

export const UserContext = createContext();
