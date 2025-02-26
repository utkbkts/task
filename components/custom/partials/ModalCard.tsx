"use client";

import { timeStamp } from "@/helpers/helpers";
import { IProduct } from "@/types/types";
import React from "react";
import { Filter } from "../Modal";

interface Props {
  objArray: IProduct[];
  setFiltered: React.Dispatch<React.SetStateAction<Filter | any>>;
  filtered: Filter;
}

const ModalCard = ({ objArray, setFiltered, filtered }: Props) => {
  //theme
  const obj = objArray
    .flatMap((item) => item.theme)
    .reduce((acc: { [key: string]: number }, value: string) => {
      if (!acc[value]) {
        acc[value] = 1;
      } else {
        acc[value] += 1;
      }
      return acc;
    }, {});

  const array = Object.entries(obj).map(([key, value]) => ({
    key,
    value,
  }));

  //vehicle
  const vehicle = objArray
    .flatMap((item) => item.vehicle)
    .reduce((acc: { [key: string]: number }, value: string) => {
      if (!acc[value]) {
        acc[value] = 1;
      } else {
        acc[value] += 1;
      }
      return acc;
    }, {});

  const vehicleArray = Object.entries(vehicle).map(([key, value]) => ({
    key,
    value,
  }));

  //features
  const features = objArray
    .flatMap((item) => item.vehicle)
    .reduce((acc: { [key: string]: number }, value: string) => {
      if (!acc[value]) {
        acc[value] = 1;
      } else {
        acc[value] += 1;
      }
      return acc;
    }, {});

  const featuresArray = Object.entries(features).map(([key, value]) => ({
    key,
    value,
  }));

  //activitiy
  const activity = objArray
    .flatMap((item) => item.vehicle)
    .reduce((acc: { [key: string]: number }, value: string) => {
      if (!acc[value]) {
        acc[value] = 1;
      } else {
        acc[value] += 1;
      }
      return acc;
    }, {});

  const activityArray = Object.entries(activity).map(([key, value]) => ({
    key,
    value,
  }));

  //price
  const priceData = objArray.map((item) => item.price);
  const priceMax = Math.max(...priceData);

  //groupSize
  const gropupData = objArray.map((item) => item.groupSize);
  const groupMax = Math.max(...gropupData);

  //time
  const timeDataMin = objArray.map((item) => item.start_time);
  const timeDataMax = objArray.map((item) => item.finish_time);
  const timeMin = Math.min(...timeDataMin);
  const timeMax = Math.max(...timeDataMax);

  //handle click
  const handleFilterChange = (category: string, value: string) => {
    setFiltered((prevFiltered: any) => ({
      ...prevFiltered,
      [category]: prevFiltered[category] === value ? [] : value,
    }));
  };

  //handle groupsize-price-time
  const handleValue = (
    category: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFiltered((prev: any) => ({
      ...prev,
      [category]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Theme */}
      <h1 className="text-gray-700 px-1 text-md">Theme</h1>
      <div className="flex flex-wrap gap-4">
        {array.map((item, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange("theme", item.key)}
            className={`py-2 px-4 rounded-md border border-gray-300 hover:bg-primary-400 transition-all duration-300 ${
              filtered.theme.includes(item.key) ? "bg-orange-400" : ""
            }`}
          >
            {item.key} ({item.value})
          </button>
        ))}
      </div>
      {/* Activity */}
      <h1 className="text-gray-700 px-1 text-md">Activity</h1>
      <div className="flex flex-wrap gap-4">
        {activityArray.map((item, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange("activity", item.key)}
            className={`py-2 px-4 rounded-md border border-gray-300 hover:bg-primary-400 transition-all duration-300 ${
              filtered.activity.includes(item.key) ? "bg-orange-400" : ""
            }`}
          >
            {item.key} ({item.value})
          </button>
        ))}
      </div>
      {/* Range Price */}
      <h1 className="text-gray-700 px-1 text-[17px]">Price</h1>
      <div className="flex items-center gap-4">
        {" "}
        <div className="relative w-full flex items-center">
          {/* Başlangıç noktası */}
          <div className="w-6 h-6 bg-white border border-black rounded-full absolute left-0"></div>
          {/* Slider */}
          <input
            value={filtered.price}
            onChange={(e) => handleValue("price", e)}
            type="range"
            max={priceMax}
            className="w-full h-[1px] bg-gray-400 rounded-lg appearance-none cursor-pointer mx-3
      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
      [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-primary-500 
      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md "
          />
          {/* Bitiş noktası */}
          <div className="w-6 h-6 bg-white border border-black rounded-full absolute right-0"></div>
        </div>
        <div>
          <span className="font-bold text-[16px] border border-gray-200 py-2 px-4 rounded-xl">
            {filtered.price ? filtered.price : priceMax}
          </span>
        </div>
      </div>
      {/* Range Price */}
      <h1 className="text-gray-700 px-1 text-[17px]">Start Time</h1>
      <div className="flex items-center gap-4">
        {" "}
        <div className="relative w-full flex items-center">
          {/* Başlangıç noktası */}
          <div className="w-6 h-6 bg-white border border-black rounded-full absolute left-0"></div>
          {/* Slider */}
          <input
            type="range"
            value={filtered.time}
            onChange={(e) => handleValue("time", e)}
            max={timeMax}
            min={timeMin}
            className="w-full h-[1px] bg-gray-400 rounded-lg appearance-none cursor-pointer mx-3
      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
      [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-primary-500 
      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md "
          />
          {/* Bitiş noktası */}
          <div className="w-6 h-6 bg-white border border-black rounded-full absolute right-0"></div>
        </div>
        <div>
          <span className="font-bold text-[16px] border border-gray-200 py-2 px-4 rounded-xl">
            {filtered.time ? timeStamp(filtered.time) : timeStamp(timeMax)}
          </span>
        </div>
      </div>
      {/* Range Price */}
      <h1 className="text-gray-700 px-1 text-[17px]">Group Size</h1>
      <div className="flex items-center gap-4">
        {" "}
        <div className="relative w-full flex items-center">
          {/* Başlangıç noktası */}
          <div className="w-6 h-6 bg-white border border-black rounded-full absolute left-0"></div>
          {/* Slider */}
          <input
            type="range"
            value={filtered.groupSize}
            onChange={(e) => handleValue("groupSize", e)}
            max={groupMax}
            className="w-full h-[1px] bg-gray-400 rounded-lg appearance-none cursor-pointer mx-3
      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
      [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-primary-500 
      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md "
          />
          {/* Bitiş noktası */}
          <div className="w-6 h-6 bg-white border border-black rounded-full absolute right-0"></div>
        </div>
        <div>
          <span className="font-bold text-[16px] border border-gray-200 py-2 px-4 rounded-xl">
            {filtered.groupSize ? filtered.groupSize : groupMax}
          </span>
        </div>
      </div>
      {/* Vehicle */}
      <h1 className="text-gray-700 px-1 text-md">Vehicle</h1>
      <div className="flex flex-wrap gap-4">
        {vehicleArray.map((item, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange("vehicle", item.key)}
            className={`py-2 px-4 rounded-md border border-gray-300 hover:bg-primary-400 transition-all duration-300 ${
              filtered.vehicle.includes(item.key) ? "bg-orange-400" : ""
            }`}
          >
            {item.key} ({item.value})
          </button>
        ))}
      </div>
      {/* Features */}
      <h1 className="text-gray-700 px-1 text-md">Features</h1>
      <div className="flex flex-wrap gap-4">
        {featuresArray.map((item, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange("features", item.key)}
            className={`py-2 px-4 rounded-md border border-gray-300 hover:bg-primary-400 transition-all duration-300 ${
              filtered.features.includes(item.key) ? "bg-orange-400" : ""
            }`}
          >
            {item.key} ({item.value})
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModalCard;
