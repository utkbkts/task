import { tours } from "@/data/tourApi";
import Button from "@/ui/Button";
import { CircleX, Search } from "lucide-react";

const Modal = () => {
  const tourThemes = tours
    .flatMap((item) => item.theme)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const tourActivity = tours
    .flatMap((item) => item.activity)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const tourVehicle = tours
    .flatMap((item) => item.vehicle)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const tourFeatures = tours
    .flatMap((item) => item.features)
    .reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ">
      <div className="w-[500px] overflow-y-auto h-[800px] bg-white shadow-xl p-4 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button type="button" className="bg-primary-500">
            TOURS
          </Button>
          <span className="text-gray-500 underline">Filter</span>
          <CircleX />
        </div>

        {/* Location Filter */}
        <div className="flex flex-col gap-4 mt-6">
          <h1 className="text-gray-700 px-1 text-md">Location</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Where you wanna visit?"
              className="px-4 py-2 rounded-xl border-gray-200 border w-full outline-none"
            />
            <Search className="w-4 h-4 absolute right-2 top-3 text-primary-400" />
          </div>
        </div>

        {/* Theme Filter */}
        <div className="flex flex-col gap-4 mt-6">
          <h1 className="text-gray-700 px-1 text-md">Theme</h1>
          <div className="flex flex-wrap gap-2">
            {Object.entries(tourThemes).map(([theme, count], index) => (
              <button
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-300 hover:bg-primary-500 hover:text-white transition"
              >
                {theme} ({count})
              </button>
            ))}
          </div>
        </div>
        {/* Activity Filter */}
        <div className="flex flex-col gap-4 mt-6">
          <h1 className="text-gray-700 px-1 text-md">Activity</h1>
          <div className="flex flex-wrap gap-2">
            {Object.entries(tourActivity).map(([theme, count], index) => (
              <button
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-300 hover:bg-primary-500 hover:text-white transition"
              >
                {theme} ({count})
              </button>
            ))}
          </div>
        </div>
        {/* price Filter */}

        <div className="flex flex-col mt-4">
          <h1 className="text-gray-700 px-1 text-md">Price</h1>
          {/* Range Input */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full">
              <input
                type="range"
                min="1000"
                max="50000"
                step="100"
                defaultValue="12500"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer "
              />
              <div className="absolute top-4 left-0 right-0 flex justify-between px-2 mt-2 text-sm text-gray-500 ">
                <span>1,000</span>
                <span>50,000</span>
              </div>
            </div>

            {/* Price Display */}
            <span className="border border-gray-200 rounded-xl py-2 px-4 text-gray-700 font-semibold text-md">
              12,500
            </span>
          </div>
        </div>

        {/* start-time Filter */}

        <div className="flex flex-col mt-4">
          <h1 className="text-gray-700 px-1 text-md">Start Time</h1>
          {/* Range Input */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full">
              <input
                type="range"
                min="1000"
                max="50000"
                step="100"
                defaultValue="12500"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer "
              />
              <div className="absolute top-4 left-0 right-0 flex justify-between px-2 mt-2 text-sm text-gray-500 ">
                <span>00:00</span>
                <span>23:59</span>
              </div>
            </div>

            {/* Price Display */}
            <span className="border border-gray-200 rounded-xl py-2 px-4 text-gray-700 font-semibold text-md">
              17:00
            </span>
          </div>
        </div>

        {/* group-size Filter */}

        <div className="flex flex-col mt-4">
          <h1 className="text-gray-700 px-1 text-md">Group Size</h1>
          {/* Range Input */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full">
              <input
                type="range"
                min="1000"
                max="50000"
                step="100"
                defaultValue="12500"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer "
              />
              <div className="absolute top-4 left-0 right-0 flex justify-between px-2 mt-2 text-sm text-gray-500 ">
                <span>0</span>
                <span>50</span>
              </div>
            </div>

            {/* Price Display */}
            <span className="border border-gray-200 rounded-xl py-2 px-4 text-gray-700 font-semibold text-md">
              50
            </span>
          </div>
        </div>

         {/* Vehicle Filter */}
         <div className="flex flex-col gap-4 mt-6">
          <h1 className="text-gray-700 px-1 text-md">Theme</h1>
          <div className="flex flex-wrap gap-2">
            {Object.entries(tourVehicle).map(([theme, count], index) => (
              <button
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-300 hover:bg-primary-500 hover:text-white transition"
              >
                {theme} ({count})
              </button>
            ))}
          </div>
        </div>

         {/* Features Filter */}
         <div className="flex flex-col gap-4 mt-6">
          <h1 className="text-gray-700 px-1 text-md">Theme</h1>
          <div className="flex flex-wrap gap-2">
            {Object.entries(tourFeatures).map(([theme, count], index) => (
              <button
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-300 hover:bg-primary-500 hover:text-white transition"
              >
                {theme} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
