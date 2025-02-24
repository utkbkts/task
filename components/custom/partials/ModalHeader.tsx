"use client"

import Button from "@/ui/Button";
import { CircleX } from "lucide-react";
interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory:React.Dispatch<React.SetStateAction<string>>;
  category:string;
  setCategoryModal:React.Dispatch<React.SetStateAction<boolean>>;
  data:string[];
  categoryModal:boolean;
}

const ModalHeader = ({ setIsModalOpen,setCategoryModal,setCategory,category,categoryModal,data }: Props) => {


  const handleSelected = (item: any) => {
    setCategory(item);
  };

  return (
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Button type="button" className="bg-primary-500 uppercase">
            {category}
          </Button>
          <span
            onClick={() => setCategoryModal(!categoryModal)}
            className="underline text-gray-500 text-md cursor-pointer"
          >
            Select
          </span>
          {categoryModal && (
            <div className=" absolute top-16 z-[999]">
              <div className="flex flex-wrap gap-4">
                {data.map((item, index) => (
                  <span
                    onClick={() => handleSelected(item)}
                    className="bg-white shadow-xl rounded-xl py-2 px-4 cursor-pointer hover:bg-primary-400 transition-all duration-400"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <span className="text-gray-500 underline">Filter</span>
        <CircleX
          onClick={() => setIsModalOpen(false)}
          className="cursor-pointer"
        />
      </div>
  );
};

export default ModalHeader;
