import React from "react";
import {
  bathroomFilterOptions,
  bedroomFilterOptions,
  limitOptions,
  propertyTypeFilterOptions,
} from "../../utils/data";

function FilterComponent({
  setCurrentDataList,
  setSearchBox,
  setBedroomFilter,
  setBathroomFilter,
  setTypeFilter,
  source,
  searchPlaceHolder,
}) {
  return (
    <div className="my-2 flex sm:flex-row flex-col">
      <div className="flex flex-row mb-1 sm:mb-0">
        <div className="relative">
          <select
            onChange={(e) => setCurrentDataList(e.target.value)}
            aria-label="filter-select-button"
            className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {limitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {source !== "common" && (
          <>
            <div className="relative">
              <select
                onChange={(e) => setTypeFilter(e.target.value)}
                aria-label="property-filter-by-type-select-button"
                className="h-full rounded-r border-r border-t border-b sm:rounded-r-none  block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                {propertyTypeFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="relative md:block hidden">
              <select
                onChange={(e) => setBathroomFilter(e.target.value)}
                aria-label="property-filter-by-bathroom-select-button"
                className="h-full rounded-r border-r border-t border-b sm:rounded-r-none  block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                {bathroomFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                onChange={(e) => setBedroomFilter(e.target.value)}
                aria-label="property-filter-by-bedroom-select-button"
                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                {bedroomFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="block relative">
        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current text-gray-500"
          >
            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
          </svg>
        </span>
        <input
          placeholder={searchPlaceHolder}
          type="text"
          id="search"
          onChange={(e) => setSearchBox(e.target.value)}
          className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default FilterComponent;
