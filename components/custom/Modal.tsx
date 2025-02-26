"use client";
import React, { useEffect, useState } from "react";
import Button from "@/ui/Button";
import ModalHeader from "./partials/ModalHeader";
import ModalCard from "./partials/ModalCard";
import { tours } from "@/data/tourApi";
import { rent } from "@/data/rentApi";
import { transfers } from "@/data/transferApi";
import { tickets } from "@/data/ticketApi";
import LocationFilter from "./partials/LocationFilter";
import { useRouter, useSearchParams } from "next/navigation";
import useFavorites from "@/hooks/useFavorites";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface Filter {
  theme: string[];
  activity: string[];
  price: any;
  time: any;
  groupSize: any;
  vehicle: string[];
  features: string[];
}
const Modal = ({ setIsModalOpen, isModalOpen }: Props) => {
  const [filtered, setFiltered] = useState({
    theme: [],
    activity: [],
    price: 0,
    time: 0,
    groupSize: 0,
    vehicle: [],
    features: [],
  });
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const { categorySelect, setCategorySelect } = useFavorites();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setFiltered({
      theme: [],
      activity: [],
      price: 0,
      time: 0,
      groupSize: 0,
      vehicle: [],
      features: [],
    });

    router.push("?");
  }, [categorySelect]);
  
  useEffect(() => {
    if (categoryModal || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [categoryModal]);

  const allData = {
    tours,
    tickets,
    rent,
    transfers,
  };

  const objArray = Object.entries(allData)
    .filter(([key]) => categorySelect.includes(key.toUpperCase()))
    .flatMap(([_, value]) => value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      const updatedSearchParams = new URLSearchParams(searchParams);
      Object.entries(filtered).forEach(([key, value]: any) => {
        if (value.length > 0 && search) {
          updatedSearchParams.set(key, value.toString());
        } else {
          updatedSearchParams.delete(key);
        }
      });

      const newPathname = `${
        window.location.pathname
      }?${updatedSearchParams.toString()}`;

      router.push(newPathname);
    }
  };

  const handleReset = () => {
    setFiltered(() => ({
      theme: [],
      activity: [],
      price: 0,
      time: 0,
      groupSize: 0,
      vehicle: [],
      features: [],
    }));
    router.push("?");
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 mt-12">
      {/* Header */}
      <div
        className={`md:w-[600px] w-[400px] ${
          categoryModal ? "overflow-hidden" : "overflow-y-auto"
        } md:h-[800px] h-[600px] bg-white shadow-xl p-4 rounded-xl`}
      >
        <ModalHeader
          setIsModalOpen={setIsModalOpen}
          setCategoryModal={setCategoryModal}
          categoryModal={categoryModal}
          setCategorySelect={setCategorySelect}
          categorySelect={categorySelect}
        />
        <LocationFilter categorySelect={categorySelect} />
        <form onSubmit={handleSubmit}>
          <ModalCard
            objArray={objArray}
            setFiltered={setFiltered}
            filtered={filtered}
          />
          <div className="mt-12 flex items-center gap-4 justify-end text-white">
            <Button type="button" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" onClick={() => setSearch(true)}>
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
