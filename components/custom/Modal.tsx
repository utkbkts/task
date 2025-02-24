"use client";
import LocationFilter from "./partials/LocationFilter";
import ModalHeader from "./partials/ModalHeader";
import RentModal from "./partials/RentModal";
import TicketModal from "./partials/TicketModal";
import TourModal from "./partials/TourModal";
import React, { useEffect, useState } from "react";
import TransferModal from "./partials/TransferModal";
import Button from "@/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setIsModalOpen }: Props) => {
  const data = ["TICKET", "RENT", "TOURS", "TRANSFER"];
  const { category } = useAppContext();
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

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
        updatedSearchParams.delete("query");
      } else {
        updatedSearchParams.delete(key);
      }
    });

    router.push(
      `${window.location.pathname}?${updatedSearchParams.toString()}`
    );
  }, [filtersSearch, router]);

  const handleReset = () => {
    setFiltersSearch(() => ({
      activity: "",
      features: "",
      theme: "",
      vehicle: "",
    }));

    const updatedSearchParams = new URLSearchParams(window.location.search);

    if (updatedSearchParams.has("query")) {
      updatedSearchParams.delete("query");
    }
    const newUrl = `${
      window.location.pathname
    }?${updatedSearchParams.toString()}`;
    window.history.replaceState(window.history.state, "", newUrl);
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
          category={category}
          categoryModal={categoryModal}
          data={data}
        />
        <LocationFilter />
        <div>
          {category === "TICKET" && (
            <TicketModal handleSelect={handleSelect} filters={filtersSearch} />
          )}
          {category === "RENT" && (
            <RentModal handleSelect={handleSelect} filters={filtersSearch} />
          )}
          {category === "TOURS" && (
            <TourModal handleSelect={handleSelect} filters={filtersSearch} />
          )}
          {category === "TRANSFER" && (
            <TransferModal
              handleSelect={handleSelect}
              filters={filtersSearch}
            />
          )}
          <div className="mt-12 flex items-center gap-4 justify-end">
            <Button onClick={handleReset} type="button">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
