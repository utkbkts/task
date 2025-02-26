import Button from "@/ui/Button";
import { CircleX } from "lucide-react";
import React from "react";
interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  categoryModal: boolean;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;
  categorySelect: string;
}

const ModalHeader = ({
  setIsModalOpen,
  setCategoryModal,
  categoryModal,
  setCategorySelect,
  categorySelect,
}: Props) => {
  const data = ["TICKETS", "RENT", "TOURS", "TRANSFERS"];
  return (
    <div className="flex items-center justify-between p-2 space-x-4 ">
      <div className="flex-1 flex justify-center relative">
        <Button type="button" onClick={() => setCategoryModal((prev) => !prev)}>
          {categorySelect}
        </Button>
        <div className="absolute flex items-center gap-4 top-12 left-24">
          {categoryModal &&
            data.map((item, index) => (
              <h2
                key={index}
                onClick={() => setCategorySelect(item)}
                className="py-2 px-4 rounded-xl shadow-md border border-gray-400 cursor-pointer hover:bg-primary-400 transition-all duration-300"
              >
                {item}
              </h2>
            ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <span className="underline text-gray-800 text-[16px]">Filter</span>
      </div>
      <div className="flex-1 flex justify-center">
        <CircleX onClick={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default ModalHeader;
