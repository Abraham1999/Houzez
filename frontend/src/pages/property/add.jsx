import React, { useEffect, useReducer, useRef, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "../../components/select";
import {
  bathroomNumberOptions,
  bedroomNumberOptions,
  gardenNumberOptions,
  propertyImages,
  propertyTypeOptions,
} from "../../utils/data";
import { useContext } from "react";
import { UserContext } from "../../utils/helpers";
import {
  addPropertyHandler,
  editPropertyHandler,
} from "../../services/actions/properties";
import { propertyReducer } from "../../services/reducers/property";

const AddProperty = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const existingProperty = useLocation().state;
  const addressRef = useRef();
  const postcodeRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const [propertyType, setPropertyType] = useState(
    existingProperty === null
      ? propertyTypeOptions[0].value
      : existingProperty.type
  );
  const [bathroomNumber, setBathroomNumber] = useState(
    existingProperty === null
      ? bathroomNumberOptions[0].value
      : existingProperty.bathrooms
  );
  const [bedroomNumber, setBedroomNumber] = useState(
    existingProperty === null
      ? bedroomNumberOptions[0].value
      : existingProperty.bedrooms
  );
  const [gardenNumber, setGardenNumber] = useState(
    existingProperty === null
      ? gardenNumberOptions[0].value
      : existingProperty.garden
  );
  const [addressError, setAddressError] = useState(false);
  const [postCodeError, setPostCodeError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const [property, dispatch] = useReducer(propertyReducer, []);

  const clearForm = () => {
    addressRef.current.value = "";
    postcodeRef.current.value = "";
    descriptionRef.current.value = "";
    priceRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddressError(!addressRef.current.value);
    setPostCodeError(!postcodeRef.current.value);
    setDescriptionError(!descriptionRef.current.value);
    setPriceError(!priceRef.current.value);

    if (
      addressRef.current.value &&
      postcodeRef.current.value &&
      priceRef.current.value &&
      descriptionRef.current.value
    ) {
      if (existingProperty === null) {
        addPropertyHandler(
          {
            image:
              propertyImages[Math.floor(Math.random() * propertyImages.length)],
            sellerId: user[0].id,
            createdAt: new Date().toUTCString(),
            address: addressRef.current.value,
            postcode: postcodeRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            type: propertyType,
            bathrooms: bathroomNumber,
            bedrooms: bedroomNumber,
            garden: gardenNumber,
            status: "For sale",
          },
          dispatch
        );
      } else {
        editPropertyHandler(
          {
            createdAt: new Date().toUTCString(),
            address: addressRef.current.value,
            postcode: postcodeRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            type: propertyType,
            bathrooms: bathroomNumber,
            bedrooms: bedroomNumber,
            garden: gardenNumber,
            status: "For sale",
          },
          existingProperty.id,
          dispatch
        );
      }

      navigate("/property");
      clearForm();
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("houzez_email")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className="py-16 w-full max-w-2xl justify-center mx-auto">
      <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div className="">
          <div className="">
            <Input
              type="text"
              value={existingProperty === null ? "" : existingProperty.address}
              label="Address"
              name="address"
              error={addressError}
              innerRef={addressRef}
              placeholder="Please enter the property address"
            />
          </div>

          <div className="mt-4">
            <Input
              type="text"
              value={existingProperty === null ? "" : existingProperty.postcode}
              label="Post Code"
              name="postcode"
              error={postCodeError}
              innerRef={postcodeRef}
              placeholder="Please enter the property postcode"
            />
          </div>

          <div className="mt-4">
            <Input
              type="text"
              value={
                existingProperty === null ? "" : existingProperty.description
              }
              label="Description"
              name="description"
              error={descriptionError}
              innerRef={descriptionRef}
              placeholder="Please enter the property description"
            />
          </div>
          <div className="mt-4">
            <Input
              type="text"
              value={existingProperty === null ? "" : existingProperty.price}
              label="Price(£)"
              name="price"
              error={priceError}
              innerRef={priceRef}
              placeholder="Please enter the property price"
            />
          </div>

          <div className="mt-4">
            <Select
              label="Type"
              name="type"
              options={propertyTypeOptions}
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Select
              label="Bathroom"
              name="bathroom"
              options={bathroomNumberOptions}
              value={bathroomNumber}
              onChange={(e) => setBathroomNumber(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Select
              label="Bedroom"
              name="bedroom"
              options={bedroomNumberOptions}
              value={bedroomNumber}
              onChange={(e) => setBedroomNumber(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Select
              label="Garden"
              name="garden"
              options={gardenNumberOptions}
              value={gardenNumber}
              onChange={(e) => setGardenNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Button
            type="submit"
            className="w-full bg-[#0C356A] hover:bg-[#0C356A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            text="Submit"
          />
        </div>
      </form>
    </main>
  );
};
export default AddProperty;
