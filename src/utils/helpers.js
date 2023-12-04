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

export const generatInitials = (firstName, lastName) => {
  const firstNameInitial = firstName.slice(0, 1);
  const lastNameInitial = lastName.slice(0, 1);
  const initials = firstNameInitial + lastNameInitial;
  return initials;
};

export const filterData = (
  data,
  limit,
  searchTerm,
  bedroom,
  type,
  bathroom
) => {
  switch (true) {
    case limit === "all" &&
      searchTerm === "" &&
      bedroom === "Bedrooms" &&
      bathroom === "Bathrooms" &&
      type === "Type":
      return data;
    case searchTerm !== "":
      return data.filter(
        (data) =>
          data.firstName.includes(searchTerm) ||
          data.lastName.includes(searchTerm) ||
          data.email.includes(searchTerm)
      );
    case limit !== "all":
      return data.slice(0, limit);
    case bedroom !== "Bedrooms":
      return data.filter((property) => property.bedrooms === bedroom);
    case bathroom !== "Bathrooms":
      return data.filter((property) => property.bathrooms === bathroom);
    case type !== "Type":
      return data.filter((property) => property.type === type);
    default:
      return data;
  }
};
