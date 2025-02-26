"use client";
import Card from "@/components/cards/Cards";
import { rent } from "@/data/rentApi";
import { tickets } from "@/data/ticketApi";
import { tours } from "@/data/tourApi";
import { transfers } from "@/data/transferApi";
import useFavorites from "@/hooks/useFavorites";
import { IProduct } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import TabsClick from "./TabsClick";

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
  const start_time = searchParams.get("time");
  const query = searchParams.get("query") as string;

  const filters = {
    ...(vehicle && { vehicle }),
    ...(theme && { theme }),
    ...(price && { price }),
    ...(features && { features }),
    ...(groupSize && { groupSize }),
    ...(start_time && { start_time }),
    ...(activity && { activity }),
    ...(query && { query }),
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
        (!filters.start_time ||
          (product.start_time >= Number(filters.start_time) &&
            product.finish_time <= 1740603599)) &&
        (!filters.activity || product.activity.includes(filters.activity)) &&
        (product.title.toLowerCase().includes(query?.toLowerCase()))
      );
    })
  );

  const hasSearch = Object.keys(filters).length > 0;
  const productsToDisplay = hasSearch ? combinedProducts : dataMap[tabsActive];

  const dataLength =
    hasSearch && combinedProducts.length > 0
      ? combinedProducts.length
      : dataMap[tabsActive].length;

  return (
    <div className="container mx-auto">
      <TabsClick
        setTabs={setTabs}
        tabsActive={tabsActive}
        dataLength={dataLength}
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((post: IProduct, index: number) => (
            <Card key={`${tabsActive}-${post.id}-${index}`} post={post} />
          ))
        ) : (
          <div>Not found</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
