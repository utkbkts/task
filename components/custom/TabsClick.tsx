"use client";
import { IProduct } from "@/types/types";
import { useEffect, useState } from "react";
import TourCard from "../cards/TourCard";
import { tours } from "@/data/tourApi";
import { tickets } from "@/data/ticketApi";
import { rent } from "@/data/rentApi";
import { transfers } from "@/data/transferApi";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context";

const data = [
  {
    id: 1,
    title: "Tours",
  },
  {
    id: 2,
    title: "Tickets",
  },
  {
    id: 3,
    title: "Rent",
  },
  {
    id: 4,
    title: "Transfer",
  },
];

const TabsClick = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const searchParams = useSearchParams();
  const vehicle = searchParams.get("vehicle");
  const features = searchParams.get("features");
  const activity = searchParams.get("activity");
  const theme = searchParams.get("theme");
  const filters = {
    ...(features && { features }),
    ...(vehicle && { vehicle }),
    ...(activity && { activity }),
    ...(theme && { theme }),
  };
  const { category } = useAppContext();

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      if (key) {
        updatedSearchParams.delete(key, value);
      }
    });

    const url = new URL(window.location.href);
    url.search = updatedSearchParams.toString();
    window.history.replaceState({}, "", url.toString());
  }, [category]);

  const getCategoryData = () => {
    switch (category) {
      case "TICKET":
        return tickets;
      case "RENT":
        return rent;
      case "TOURS":
        return tours;
      case "TRANSFER":
        return transfers;
      default:
        return [];
    }
  };

  const filteredData = getCategoryData().filter((item: Partial<IProduct>) =>
    Object.entries(filters).every(([key, value]) =>
      value ? (item as Record<string, any>)[key]?.includes(value) : true
    )
  );

  return (
    <div className="mt-24">
      {/* Tab Title --- */}
      <div className="flex space-x-4 border-b-2 border-gray-300">
        {data.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === tab.id
                ? "text-primary-500 border-b-4 border-primary-500"
                : "text-gray-600 hover:text-primary-500 "
            } transition duration-300`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content ---- */}
      <div>
        {Object.values(filters).some((val) => val) ? (
          <div className="grid grid-cols-4 gap-4">
            {filteredData
              .filter((post: any) =>
                Object.entries(filters).every(([key, value]) =>
                  value ? post[key]?.includes(value) : true
                )
              )
              .map((tour: IProduct) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
          </div>
        ) : (
          <div className="mt-8">
            {activeTab === 1 && (
              <div className="grid grid-cols-4 gap-4">
                {tours?.map((tour: IProduct) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
            {activeTab === 2 && (
              <div className="grid grid-cols-4 gap-4">
                {tickets?.map((tour: IProduct) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
            {activeTab === 3 && (
              <div className="grid grid-cols-4 gap-4">
                {rent?.map((tour: IProduct) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
            {activeTab === 4 && (
              <div className="grid grid-cols-4 gap-4">
                {transfers?.map((tour: IProduct) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsClick;
