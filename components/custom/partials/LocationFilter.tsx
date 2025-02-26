"use client";

import { rent } from "@/data/rentApi";
import { tickets } from "@/data/ticketApi";
import { tours } from "@/data/tourApi";
import { transfers } from "@/data/transferApi";
import { updateSearchParams } from "@/helpers/helpers";
import { IProduct } from "@/types/types";
import { useDebounce } from "@/utils/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface Props {
  categorySelect: string;
}

const LocationFilter = ({ categorySelect }: Props) => {
  const [state, setState] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const debounced = useDebounce(state, 300);
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSelect = (searchQuery: any) => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("query", searchQuery.title);
    } else {
      params.delete("query");
    }

    const pathname = `${window.location.pathname}?${params.toString()}`;

    router.push(pathname);
    setState("");
    setModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setState(newQuery);
    setModalOpen(true);
  };
  let filtered: IProduct[] = [];
  if (categorySelect === "TICKET") {
    filtered = tickets.filter((item) =>
      item.title.toLowerCase().includes(debounced.toLowerCase())
    );
  } else if (categorySelect === "RENT") {
    filtered = rent.filter((item) =>
      item.title.toLowerCase().includes(debounced.toLowerCase())
    );
  } else if (categorySelect === "TOURS") {
    filtered = tours.filter((item) =>
      item.title.toLowerCase().includes(debounced.toLowerCase())
    );
  } else if (categorySelect === "TRANSFER") {
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
