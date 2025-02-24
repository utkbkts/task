import React from "react";

const LocationFilter = () => {
  return (
      <div className="flex flex-col gap-4 mt-6">
        <h1 className="text-gray-700 px-1 text-md">Location</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Where you wanna visit?"
            className="px-4 py-2 rounded-xl border-gray-200 border w-full outline-none"
          />
        </div>
      </div>
  );
};

export default LocationFilter;
