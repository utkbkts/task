"use client";

import Card from "@/components/cards/Cards";
import TabsClick from "@/components/home/TabsClick";
import { rent } from "@/data/rentApi";
import { tickets } from "@/data/ticketApi";
import { tours } from "@/data/tourApi";
import { transfers } from "@/data/transferApi";
import useFavorites from "@/hooks/useFavorites";
import { IProduct } from "@/types/types";
import { useSearchParams } from "next/navigation";
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
  const { categorySelect } = useFavorites();

  const searchParams = useSearchParams();
  const vehicle = searchParams.get("vehicle");
  const theme = searchParams.get("theme");
  const features = searchParams.get("features");
  const price = searchParams.get("price");
  const activity = searchParams.get("activity");
  const groupSize = searchParams.get("groupSize");
  const time = searchParams.get("time");

  const filters = {
    ...(vehicle && { vehicle }),
    ...(theme && { theme }),
    ...(price && { price }),
    ...(features && { features }),
    ...(features && { features }),
    ...(groupSize && { groupSize }),
    ...(time && { time }),
    ...(activity && { activity }),
  };

  const allData = {
    tours,
    tickets,
    rent,
    transfers,
  };

  const combinedProducts = Object.values(allData).flatMap((products) =>
    products.filter((product: IProduct) => {
      return (
        (!filters.theme || product.theme.includes(filters.theme)) &&
        (!filters.vehicle || product.vehicle.includes(filters.vehicle)) &&
        (!filters.price || product.price === Number(filters.price)) &&
        (!filters.features || product.features.includes(filters.features)) &&
        (!filters.groupSize ||
          product.groupSize === Number(filters.groupSize)) &&
        (!filters.time || product.finish_time === Number(filters.time)) &&
        (!filters.activity || product.activity.includes(filters.activity))
      );
    })
  );


  const dataLength = dataMap[tabsActive].length;

  return (
    <div className="container mx-auto">
      <TabsClick
        setTabs={setTabs}
        tabsActive={tabsActive}
        dataLength={dataLength}
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {combinedProducts
          ? combinedProducts.map((post: IProduct, index: number) => {
              return (
                <Card key={`${tabsActive}-${post.id}-${index}`} post={post} />
              );
            })
          : dataMap[tabsActive].map((post: IProduct, index: number) => {
              return (
                <Card key={`${tabsActive}-${post.id}-${index}`} post={post} />
              );
            })}
      </div>
    </div>
  );
};

export default HomePage;
