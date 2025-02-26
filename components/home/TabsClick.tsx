"use client"
import { useRouter } from "next/navigation";
import React from "react";

const tabs = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Tours",
  },
  {
    id: 3,
    title: "Rent",
  },
  {
    id: 4,
    title: "Transfer",
  },
  {
    id: 5,
    title: "Tickets",
  },
];

interface Props {
  setTabs: React.Dispatch<React.SetStateAction<number>>;
  tabsActive: number;
  dataLength:any
}

const TabsClick = ({ setTabs, tabsActive ,dataLength}: Props) => {
  const router = useRouter()
  return (
    <div className="mt-24 mb-12">
      <div className="flex items-center justify-between md:overflow-hidden overflow-x-scroll w-full md:flex-row flex-col ">
        <div className="flex items-center gap-8 flex-1  justify-center ">
          {tabs.map((item) => (
            <div key={item.id} className="relative" onClick={()=>router.push("?")}>
              <h1
                onClick={() => setTabs(item.id)}
                className={`text-xl font-medium cursor-pointer transition-colors duration-300 ${
                  tabsActive === item.id
                    ? "text-primary-500"
                    : "text-gray-600 hover:text-primary-400"
                }`}
              >
                {item.title}
              </h1>
              {tabsActive === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
        <div>
          <h1>Show Size : {dataLength}</h1>
        </div>
      </div>
    </div>
  );
};

export default TabsClick;
