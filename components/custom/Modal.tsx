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

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
}
export interface Filter {
  theme: string[];
  activity: string[];
  price: string;
  time: string;
  groupSize: string;
  vehicle: string[];
  features: string[];
}
const Modal = ({ setIsModalOpen, isModalOpen }: Props) => {
  const [filtered, setFiltered] = useState({
    theme: [],
    activity: [],
    price: "",
    time: "",
    groupSize: "",
    vehicle: [],
    features: [],
  });
  console.log("🚀 ~ Modal ~ filtered:", filtered)
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [categorySelect, setCategorySelect] = useState("TOURS");
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
        <LocationFilter categorySelect={categorySelect}/>
        <ModalCard objArray={objArray} setFiltered={setFiltered} filtered={filtered}/>
        <div className="mt-12 flex items-center gap-4 justify-end">
          <Button type="button">Reset</Button>
          <Button type="button">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
