"use client";

import Card from "@/components/cards/Cards";
import useFavorites from "@/hooks/useFavorites";
import { IProduct } from "@/types/types";

const Page = () => {
  const { favorites } = useFavorites();
  return (
    <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4">
      {favorites.map((product: IProduct) => (
        <div key={product.id}>
          <Card key={product.id} tour={product} />
        </div>
      ))}
    </div>
  );
};

export default Page;
