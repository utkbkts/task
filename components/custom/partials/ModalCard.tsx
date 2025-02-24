"use client";

import { timeStamp } from "@/helpers/helpers";
import React from "react";

interface ModalCardProps {
  title: string;
  data?: Record<string, number>;
  range?: boolean;
  min?: number | any;
  max?: number | any;
  defaultValue?: number | any;
  onSelect?: (item: string, type: string | undefined) => void;
  onRangeChange?: (value: number) => void;
  time?: boolean;
  type?: string;
  selected?:
    | {
        price: number[];
        groupSize: number[];
        startTime: number[];
        theme: string[];
        activity: string[];
        vehicle: string[];
        features: string[];
      }
    | any;
}

const ModalCard: React.FC<ModalCardProps> = ({
  title,
  data,
  range,
  min,
  max,
  defaultValue,
  onSelect,
  onRangeChange,
  time,
  type,
  selected,
}) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <h1 className="text-gray-700 px-1 text-md">{title}</h1>
      {range ? (
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full">
            <input
              type="range"
              min={min}
              max={max}
              defaultValue={time ? timeStamp(defaultValue) : defaultValue}
              onChange={(e) => onRangeChange!(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            />
            <div className="absolute top-4 left-0 right-0 flex justify-between px-2 mt-2 text-sm text-gray-500 ">
              <span>{time ? "00:00" : min}</span>
              <span>{time ? "23:59" : max}</span>
            </div>
          </div>

          {/* Display Selected Value */}
          <span className="border border-gray-200 rounded-xl py-2 px-4 text-gray-700 font-semibold text-md">
            {time ? timeStamp(defaultValue) : defaultValue}
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {data &&
            Object.entries(data).map(([theme, count], index) => (
              <button
                key={index}
                onClick={() => onSelect!(type!, theme)}
                className={`px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-300 hover:bg-primary-500 hover:text-white transition ${
                  selected === theme ? "bg-primary-500 text-white" : ""
                }`}
              >
                {theme} ({count})
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default ModalCard;
