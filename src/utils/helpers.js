import { createContext } from "react";
import { statusTypes } from "./data";

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

export const generateInitials = (firstName, lastName) => {
  const firstNameInitial = firstName.slice(0, 1);
  const lastNameInitial = lastName.slice(0, 1);
  const initials = firstNameInitial + lastNameInitial;
  return initials;
};

export const filterData = (data, limit, searchTerm) => {
  switch (true) {
    case limit === "all" && searchTerm === "":
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

    default:
      return data;
  }
};

export const filterPropertyData = (
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
          data.address.includes(searchTerm) || data.price.includes(searchTerm)
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

export const filterBookingData = (data, limit, searchTerm) => {
  switch (true) {
    case limit === "all" && searchTerm === "":
      return data;
    case searchTerm !== "":
      return data.filter(
        (data) =>
          data.address.includes(searchTerm) ||
          new Date(data.bookingTime).toUTCString().includes(searchTerm) ||
          data.postcode.includes(searchTerm)
      );
    case limit !== "all":
      return data.slice(0, limit);

    default:
      return data;
  }
};

export const propertyTypeTagColor = (status) => {
  switch (status) {
    case statusTypes[0].value:
      return "bg-sky-700";
    case statusTypes[1].value:
      return "bg-teal-700";
    case statusTypes[2].value:
      return "bg-stone-700";
    default:
      return "bg-sky-700";
  }
};
