import React from "react";
import { Link } from "react-router-dom";
import { TbBed } from "react-icons/tb";
import { GiShower, GiTreeBranch } from "react-icons/gi";
import Tag from "../components/Tag";

function PropertyContainer({ property }) {
  return (
    <div className="py-6" key={property.id}>
      <Link to={`/property/${property.id}`}>
        <div className="">
          <div className="rounded-lg shadow-lg border md:flex">
            <img
              src={property.image.url}
              alt={property.address}
              className="max-w-1/3 min-w-1/3 w-full md:w-64 object-cover relative rounded-l-none md:rounded-l-lg rounded-t-lg md:rounded-t-none rounded-tl-lg md:rounded-tl-lg"
            />
            <div className="p-6 w-full">
              <div className="flex justify-between">
                <h2 className="font-bold text-xl md:text-3xl mb-2 text-black">
                  £{property.price}
                </h2>
                <Tag
                  value={property.status}
                  extraStyle="bg-teal-500 float-right"
                />
              </div>
              <div className="flex space-x-4 pb-4 pt-1">
                <div className="flex space-x-1">
                  <TbBed
                    style={{
                      color: "black",
                      fontSize: "25px",
                      fontWeight: "normal",
                    }}
                  />
                  <p>{property.bedrooms} bd</p>
                </div>

                <div className="flex space-x-1">
                  <GiShower
                    style={{
                      color: "black",
                      fontSize: "25px",
                      fontWeight: "normal",
                    }}
                  />
                  <p>{property.bathrooms} ba</p>
                </div>
                <div className="flex space-x-1">
                  <GiTreeBranch
                    style={{
                      color: "black",
                      fontSize: "25px",
                      fontWeight: "normal",
                    }}
                  />
                  <p>{property.garden} gd</p>
                </div>
              </div>

              <div>
                <p className="text-xl font-semibold text-black">
                  {property.bedrooms} bed {property.type} house for sale
                </p>
                <p className="text-lg text-gray-500">
                  {property.address} {property.postcode}
                </p>
                <p className="text-lg py-2 text-black">
                  {property.description}
                </p>
                <p className="text-gray-500 text-sm">
                  Listed on {property.createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PropertyContainer;
