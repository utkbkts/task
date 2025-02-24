"use client";

import { useAppContext } from "@/context";
import { rent } from "@/data/rentApi";
import { tickets } from "@/data/ticketApi";
import { tours } from "@/data/tourApi";
import { transfers } from "@/data/transferApi";
import { IProduct } from "@/types/types";
import { useDebounce } from "@/utils/useDebounce";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LocationFilter = () => {
  const [state, setState] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const debounced = useDebounce(state, 300);
  const router = useRouter();
  const { category } = useAppContext();
  const handleSelect = (item: any) => {
    router.push(`/?query=${encodeURIComponent(item.title)}`);
    setState("");
    setModalOpen(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setState(newQuery);
    setModalOpen(true);
  };
  let filtered: IProduct[] = [];
  if (category === "TICKET") {
    filtered = tickets.filter((item) =>
      item.title.toLowerCase().includes(debounced.toLowerCase())
    );
  } else if (category === "RENT") {
    filtered = rent.filter((item) =>
      item.title.toLowerCase().includes(debounced.toLowerCase())
    );
  } else if (category === "TOURS") {
    filtered = tours.filter((item) =>
      item.title.toLowerCase().includes(debounced.toLowerCase())
    );
  } else if (category === "TRANSFER") {
    filtered = transfers.filter((item) =>
      item.title.toLowerCase().includes(debounced.toLowerCase())
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      <h1 className="text-gray-700 px-1 text-md">Location</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Where you wanna visit?"
          value={state}
          onChange={handleInputChange}
          className="px-4 py-2 rounded-xl border-gray-200 border w-full outline-none"
        />
        {isModalOpen && state.length > 0 && (
          <div className="absolute top-16 flex flex-col gap-4 w-[200px] bg-white rounded-md h-[200px] overflow-y-auto text-black">
            {filtered?.length > 0 ? (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="p-2 cursor-pointer hover:bg-slate-400 rounded-md"
                >
                  <h3>{item.title}</h3>
                </div>
              ))
            ) : (
              <p className="text-gray-500 flex items-center justify-center h-full">
                Not found views
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationFilter;
