"use client";

import Card from "@/components/cards/Cards";
import TabsClick from "@/components/home/TabsClick";
import { rent } from "@/data/rentApi";
import { tickets } from "@/data/ticketApi";
import { tours } from "@/data/tourApi";
import { transfers } from "@/data/transferApi";
import { IProduct } from "@/types/types";
import { useState } from "react";

const dataMap: { [key: number]: IProduct[] } = {
  1: [...tours, ...rent, ...transfers, ...tickets],
  2: tours,
  3: rent,
  4: transfers,
  5: tickets,
};
const HomePage = () => {
  const [tabsActive, setTabs] = useState<number>(1);

  const dataLength = dataMap[tabsActive].length;

  return (
    <div className="container mx-auto">
      <TabsClick
        setTabs={setTabs}
        tabsActive={tabsActive}
        dataLength={dataLength}
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {dataMap[tabsActive].map((post: IProduct, index: number) => {
          return <Card key={`${tabsActive}-${post.id}-${index}`} post={post} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
