"use client";
import LocationFilter from "./partials/LocationFilter";
import ModalHeader from "./partials/ModalHeader";
import RentModal from "./partials/RentModal";
import TicketModal from "./partials/TicketModal";
import TourModal from "./partials/TourModal";
import React, { FormEvent, useEffect, useState } from "react";
import TransferModal from "./partials/TransferModal";
import Button from "@/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setIsModalOpen }: Props) => {
  const data = ["TICKET", "RENT", "TOURS", "TRANSFER"];
  const [category, setCategory] = useState<string>("TOURS");
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial filters based on URL params
  const [filtersSearch, setFiltersSearch] = useState({
    theme: searchParams.get("theme"),
    activity: searchParams.get("activity"),
    vehicle: searchParams.get("vehicle"),
    features: searchParams.get("features"),
  });

  useEffect(() => {
    if (categoryModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [categoryModal]);

  const handleSelect = (type: string, value: string) => {
    setFiltersSearch((prevState: any) => ({
      ...prevState,
      [type]: prevState[type] === value ? null : value,
    }));
  };

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    Object.entries(filtersSearch).forEach(([key, value]) => {
      if (value) {
        updatedSearchParams.set(key, value);
      } else {
        updatedSearchParams.delete(key);
      }
    });

    router.push(
      `${window.location.pathname}?${updatedSearchParams.toString()}`
    );
  }, [filtersSearch, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 mt-12">
      {/* Header */}
      <div
        className={`w-[600px] ${
          categoryModal ? "overflow-hidden" : "overflow-y-auto"
        } h-[800px] bg-white shadow-xl p-4 rounded-xl`}
      >
        <ModalHeader
          setIsModalOpen={setIsModalOpen}
          setCategoryModal={setCategoryModal}
          setCategory={setCategory}
          category={category}
          categoryModal={categoryModal}
          data={data}
        />
        <LocationFilter />
        <form onSubmit={handleSubmit}>
          {category === "TICKET" && (
            <TicketModal handleSelect={handleSelect} filters={filtersSearch} />
          )}
          {category === "RENT" && <RentModal />}
          {category === "TOURS" && <TourModal />}
          {category === "TRANSFER" && <TransferModal />}
          <div className="mt-12 flex items-center gap-4 justify-end">
            <Button type="button">Reset</Button>
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
