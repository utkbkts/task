import React, { useState } from "react";
import ModalCard from "./ModalCard";
import { tickets } from "@/data/ticketApi";

interface Props {
  handleSelect: (item: string, type: string | any) => void;
  filters: any;
}

const TicketModal = ({ handleSelect, filters }: Props) => {
  // price
  const priceMax = Math.max(...tickets.map((item) => item.price));
  const [price, setPrice] = useState(priceMax);

  // startTime
  const startFinisMax = Math.max(...tickets.map((item) => item.finish_time));
  const startFinisMin = Math.max(...tickets.map((item) => item.start_time));
  const [timeMax, setTimeMax] = useState(startFinisMax);

  const [groupSize, setGroupSize] = useState(50);

  const tourThemes = tickets
    .flatMap((item) => item.theme)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const tourActivity = tickets
    .flatMap((item) => item.activity)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const tourVehicle = tickets
    .flatMap((item) => item.vehicle)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const tourFeatures = tickets
    .flatMap((item) => item.features)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const handleRangeChange = (type: string, value: number) => {
    if (type === "price") setPrice(value);
    if (type === "groupSize") setGroupSize(value);
    if (type === "startTime") setTimeMax(value);
  };

  return (
    <div>
      {/* Theme Filter */}
      <ModalCard
        title="Theme"
        data={tourThemes}
        onSelect={handleSelect}
        type="theme"
        selected={filters.theme}
      />

      {/* Activity Filter */}
      <ModalCard
        title="Activity"
        data={tourActivity}
        onSelect={handleSelect}
        type="activity"
        selected={filters.activity}
      />

      {/* Vehicle Filter */}
      <ModalCard
        title="Vehicle"
        data={tourVehicle}
        onSelect={handleSelect}
        type="vehicle"
        selected={filters.vehicle}
      />

      {/* Features Filter */}
      <ModalCard
        title="Features"
        data={tourFeatures}
        onSelect={handleSelect}
        type="features"
        selected={filters.features}
      />

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

export default TicketModal;
