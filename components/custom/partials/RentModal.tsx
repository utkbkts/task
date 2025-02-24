import React, { useState } from "react";
import ModalCard from "./ModalCard";
import { rent } from "@/data/rentApi";

const RentModal = () => {
  // price
  const priceMax = Math.max(...rent.map((item) => item.price));
  const [price, setPrice] = useState(priceMax);

  // startTime
  const startFinisMax = Math.max(...rent.map((item) => item.finish_time));
  const startFinisMin = Math.max(...rent.map((item) => item.start_time));
  const [timeMax, setTimeMax] = useState(startFinisMax);


  const [groupSize, setGroupSize] = useState(50);

  const tourThemes = rent
    .flatMap((item) => item.theme)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const tourActivity = rent
    .flatMap((item) => item.activity)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const tourVehicle = rent
    .flatMap((item) => item.vehicle)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const tourFeatures = rent
    .flatMap((item) => item.features)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const handleSelect = (item: string) => {
    console.log("Selected:", item);
  };

  const handleRangeChange = (type: string, value: number) => {
    if (type === "price") setPrice(value);
    if (type === "groupSize") setGroupSize(value);
    if (type === "startTime") setTimeMax(value);
  };

  return (
    <div>
      {/* Theme Filter */}
      <ModalCard title="Theme" data={tourThemes} onSelect={handleSelect} />

      {/* Activity Filter */}
      <ModalCard title="Activity" data={tourActivity} onSelect={handleSelect} />

      {/* Vehicle Filter */}
      <ModalCard title="Vehicle" data={tourVehicle} onSelect={handleSelect} />

      {/* Features Filter */}
      <ModalCard title="Features" data={tourFeatures} onSelect={handleSelect} />

      {/* Price Filter */}
      <ModalCard
        title="Price"
        range={true}
        min={0}
        max={priceMax}
        defaultValue={price}
        onRangeChange={(value) => handleRangeChange("price", value)}
      />

      {/* Start Time Filter */}
      <ModalCard
        title="Start Time"
        range={true}
        min={startFinisMin}
        max={startFinisMax}
        time={true}
        defaultValue={timeMax}
        onRangeChange={(value) => handleRangeChange("startTime", value)}
      />
      {/* Group Size Filter */}
      <ModalCard
        title="Group Size"
        range={true}
        min={0}
        max={50}
        defaultValue={groupSize}
        onRangeChange={(value) => handleRangeChange("groupSize", value)}
      />
    </div>
  );
};

export default RentModal;
